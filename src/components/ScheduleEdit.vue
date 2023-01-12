<template>
  <div>
    <span>Расписание: <input v-model="scheduleRef.schedule.name"></span>
    <span>Дата конца: <Datepicker v-model="endDate" :enable-time-picker="false"></Datepicker></span>
    <button @click="save">save</button>
    <div>
      <div v-for="day in weekdays">
        {{ day }}
        <ScheduleEvent 
          v-for="event in eventsSortedByDay[day]"
          :key="event.id"
          :event.sync="event"
          @delete="deleteEvent"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ISchedule } from '@/interfaces/interfaces'
import ScheduleEvent from '@/components/ScheduleEvent.vue'

import { FetchMethods } from '@/constants/fetch';
import api from '@/utils/api';
import { reactive } from '@vue/reactivity';
import moment from 'moment';

import Datepicker from '@vuepic/vue-datepicker';
import { ref, watch } from 'vue';
import { RRule } from 'rrule';

moment.locale('ru')

const props = defineProps({
  schedule: Object as () => ISchedule
})

const scheduleRef = reactive({
  schedule: props.schedule
})

const rule = RRule.fromString(scheduleRef.schedule.events[0].recurrence.toString())

const endDate = ref(new Date(rule.origOptions.until))

watch(endDate, (date) => {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  scheduleRef.schedule.events.map(event => {
    rule.origOptions.until = new Date(year, month, day)
    event.recurrence = [rule.toString()]
  })
})

const deleteEvent = (id) => {
  const index = props.schedule.events.findIndex(event => event.id === id)
  scheduleRef.schedule.events.splice(index, 1)
}

type eventsSortedByDayType = Record<string, any[]>

const eventsSortedByDay = scheduleRef.schedule.events.reduce<eventsSortedByDayType>((days, event) => {
  const eventDay = moment(event.end.dateTime).format('dddd')
  
  if(eventDay in days) {
    days[eventDay].push(event)
  } else {
    days[eventDay] = []
  }

  days[eventDay].sort((a,b) => moment(a.start.dateTime).valueOf() - moment(b.start.dateTime).valueOf())

  return days
}, {})

const weekdays = moment.weekdays()
weekdays.shift()
weekdays.pop()

const save = async () => {
  const params = {
    method: FetchMethods.PATCH,
    body: JSON.stringify(scheduleRef.schedule),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }

  await fetch(`${import.meta.env.PUBLIC_API_URL}/${api.schedules.fetchById(props.schedule.id)}`, params)
}
</script>
