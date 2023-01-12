<template>
  <div>
    <button @click="save">save</button>
    <span>Расписание: <input v-model="scheduleRef.schedule.name"></span>
    <span>Дата конца: <Datepicker v-model="endDate" :enable-time-picker="false"></Datepicker></span>
    <button @click="addEvent">add event</button>
    <div>
      added events (exams)
      <ScheduleEvent 
        v-for="event in addedEvents"
        :key="event.id"
        :event.sync="event"
        @delete="deleteEvent"
      />
    </div>
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
import { reactive, computed, ref } from '@vue/reactivity';
import moment from 'moment';

import Datepicker from '@vuepic/vue-datepicker';
import { watch } from 'vue';
import { RRule } from 'rrule';

moment.locale('ru')

const props = defineProps({
  schedule: Object as () => ISchedule
})

const scheduleRef = reactive({
  schedule: props.schedule
})

const addedEvents = ref(scheduleRef.schedule.events.filter(event => !event.recurrence.length))

const rule = RRule.fromString(scheduleRef.schedule.events[scheduleRef.schedule.events.length - 1].recurrence.toString())

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

const addEvent = () => {
  const event = {
    description: '',
    end: {
      dateTime: moment().format(),
      timeZone: 'Europe/Simferopol'
    },
    start: {
      dateTime: moment().format(),
      timeZone: 'Europe/Simferopol'
    },
    extendedProperties: {
      shared: {
        weekType: 'both'
      }
    },
    location: "КИПУ",
    reminders: {
      useDefault: false,
      overrides: [
        {
          method: "popup",
          minutes: 10
        }
      ]
    },
    recurrence: [],
    summary: {
      name: ''
    }
  }

  addedEvents.value.unshift(event)
}

const deleteEvent = (id) => {
  const index = props.schedule.events.findIndex(event => event.id === id)
  scheduleRef.schedule.events.splice(index, 1)
}

type eventsSortedByDayType = Record<string, any[]>

const eventsSortedByDay = computed(() => {
  return scheduleRef.schedule.events.reduce<eventsSortedByDayType>((days, event) => {
    const eventDay = moment(event.end.dateTime).format('dddd')
    
    if(eventDay in days) {
      days[eventDay].push(event)
    } else {
      days[eventDay] = []
    }

    days[eventDay].sort((a,b) => moment(a.start.dateTime).valueOf() - moment(b.start.dateTime).valueOf())

    return days
  }, {})
})

const weekdays = moment.weekdays()
weekdays.shift()
weekdays.pop()

const save = async () => {
  scheduleRef.schedule.events = [...scheduleRef.schedule.events, ...addedEvents.value]

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
