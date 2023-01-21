<template>
  <div class="schedule__edit">
    <h2 class="schedule__title">
      <a href="/schedules">
        <FAIcon icon="circle-chevron-left" />
      </a>
      Edit schedule
    </h2>
    
    <Alert :type="AlertType.SUCCESS" v-if="isSuccess">
      Saved successfully!
    </Alert>

    <Alert :type="AlertType.ERROR" v-if="isError">
      Error occurred!
    </Alert>

    <ScheduleEditHeader 
      :name="scheduleRef.schedule.name"
      :is-valid="!v.$invalid"
      @UPDATE:NAME="updateName"
      @SAVE="save"
    />

    <ScheduleEndDate 
      :end-date="scheduleRef.endDate" 
      @UPDATE:ENDDATE="updateEndDate"
    />

    <ScheduleUnsortedEventsList
      :events="addedEvents" 
    />

    <ScheduleEventList 
      v-if="scheduleRef.schedule.events.length"
      :events="scheduleRef.schedule.events"
    />
  </div>
</template>

<script setup lang="ts">
import type { ISchedule } from '@/interfaces/interfaces'

import { FetchMethods } from '@/constants/fetch';
import api from '@/utils/api';
import { reactive, ref } from '@vue/reactivity';
import moment from 'moment';
import { useVuelidate } from '@vuelidate/core'

import { RRule } from 'rrule';
import ScheduleEditHeader from './edit/ScheduleEditHeader.vue';
import ScheduleEndDate from './edit/ScheduleEndDate.vue';
import ScheduleEventList from './edit/ScheduleEventList.vue';
import ScheduleUnsortedEventsList from './edit/ScheduleUnsortedEventsList.vue';
import type { PropType } from 'vue';
import Alert from '@/components/Alert.vue'
import { AlertType } from '@/constants/alert'

moment.locale('ru')

const props = defineProps({
  schedule: Object as PropType<ISchedule>
})

const scheduleRef = reactive({
  schedule: props.schedule,
  endDate: null
})

const updateName = (value: string): void => {
  scheduleRef.schedule.name = value
}

const isSuccess = ref(false)
const isError = ref(false)

const v = useVuelidate()

const addedEvents = ref(scheduleRef.schedule.events.filter(event => !event.recurrence.length))

const recurrenceRule = RRule.fromString(scheduleRef.schedule.events[scheduleRef.schedule.events.length - 1].recurrence.toString())

scheduleRef.endDate = new Date(recurrenceRule.origOptions.until)

const updateEndDate = (date) => {
  scheduleRef.endDate = date
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  scheduleRef.schedule.events.map(event => {
    recurrenceRule.origOptions.until = new Date(year, month, day)
    event.recurrence = [recurrenceRule.toString()]
  })
}

const success = () => {
  isSuccess.value = true
  setTimeout(() => isSuccess.value = false, 5000)
}

const error = () => {
  isError.value = true
  setTimeout(() => isError.value = false, 5000)
}

const save = async () => {
  if(v.value.$invalid) {
    error()
    return
  }

  scheduleRef.schedule.events = [...scheduleRef.schedule.events, ...addedEvents.value]

  const params = {
    method: FetchMethods.PATCH,
    body: JSON.stringify(scheduleRef.schedule),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }

  await fetch(`${import.meta.env.PUBLIC_API_URL}/${api.schedules.fetchById(props.schedule.id)}`, params)
    .then(() => {
      success()
    })
    .catch(() => {
      error()
    })
}
</script>
