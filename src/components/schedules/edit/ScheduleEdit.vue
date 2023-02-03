<template>
  <div class="schedule__edit">
    <h2 class="schedule__title">
      <a href="/schedules">
        <FAIcon icon="circle-chevron-left" />
      </a>
      {{ t('schedule.edit') }}
    </h2>
    
    <div v-if="scheduleRef.schedule">
      <Alert :type="alert.type" v-if="alert.message && alert.type">
        {{ alert.message }}
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
  </div>
</template>

<script setup lang="ts">
import type { IAlert, ISchedule } from '@/interfaces/interfaces'

import { FetchMethods } from '@/constants/fetch';
import api from '@/utils/endpoints';
import { reactive, ref } from '@vue/reactivity';
import { useVuelidate } from '@vuelidate/core'

import { RRule } from 'rrule';
import ScheduleEditHeader from './ScheduleEditHeader.vue';
import ScheduleEndDate from './ScheduleEndDate.vue';
import ScheduleEventList from './ScheduleEventList.vue';
import ScheduleUnsortedEventsList from './ScheduleUnsortedEventsList.vue';
import { PropType, watch } from 'vue';
import Alert from '@/components/alert/Alert.vue'
import { AlertType } from '@/constants/alert'
import { useI18n } from 'vue-i18n';

const { t } = useI18n()

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

const alert = reactive<IAlert>({
  message: null,
  type: null
})

watch(alert, () => {
  setTimeout(() => {
    alert.message = null
    alert.type = null
  }, 5000)
})

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

const save = async () => {
  if(v.value.$invalid) {
    alert.message = t('error.validation.title')
    alert.type = AlertType.ERROR
    return
  }

  const events = [...scheduleRef.schedule.events, ...addedEvents.value]
  const schedule = {
    ...scheduleRef.schedule,
    events
  }

  const params: RequestInit = {
    method: FetchMethods.PATCH,
    body: JSON.stringify(schedule),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    credentials: 'include'
  }

  await fetch(`${import.meta.env.PUBLIC_API_URL}${api.schedules.fetchById(props.schedule.id)}`, params)
    .then((response) => {
      if(response.status === 200) {
        alert.message = t('schedule.save.success')
        alert.type = AlertType.SUCCESS
        return
      }

      alert.message = t(`error.http.${response.status}`)
      alert.type = AlertType.ERROR
    })
    .catch(() => {
      alert.message = t('error.validation.title')
      alert.type = AlertType.ERROR
    })
}
</script>
