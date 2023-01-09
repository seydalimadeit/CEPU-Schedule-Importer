<template>
  <div>
    <span>Расписание: {{ scheduleRef.schedule.name }}</span>
    <button @click="save">save</button>
    <div>
      <div v-for="[day, events] in Object.entries(eventsSortedByDay)">
        {{ day }}
        <ScheduleEvent 
          v-for="event in events"
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

moment.locale('ru')

const props = defineProps({
  schedule: Object as () => ISchedule
})

const scheduleRef = reactive({
  schedule: props.schedule
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

  return days
}, {})

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
