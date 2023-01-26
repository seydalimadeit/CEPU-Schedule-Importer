<template>
  <div
    v-for="day in weekdays"
  >
    <span class="schedule__event-list-day">
      {{ day }}
    </span>
    
    <div 
      v-for="weekType in Object.keys(eventsSortedByDay[day])"
    >
      <div class="schedule__event-list-type">{{ weekType }}</div>
      <div class="schedule__event-list">
        <ScheduleEvent 
          v-for="event in eventsSortedByDay[day][weekType]"
          :key="event.id"
          :event="event"
          @DELETE="deleteEvent(event.id)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ScheduleEmit } from '@/constants/emits';
import type { IEvent } from '@/interfaces/interfaces';
import { computed, reactive } from '@vue/reactivity';
import moment from 'moment';
import ScheduleEvent from './ScheduleEvent.vue';
import type { PropType } from 'vue';

defineEmits([ScheduleEmit.DELETE])

const props = defineProps({
  events: {
    required: true,
    type: Array as PropType<IEvent[]>
  },
  isSortedByDays: {
    type: Boolean,
    default: true
  }
})

const state = reactive({ 
  events: props.events
})

const weekdays = moment.weekdays()
weekdays.shift()
weekdays.pop()

type eventsSortedByDayType = Record<string, any>

const eventsSortedByDay = computed(() => {
  return state.events.reduce<eventsSortedByDayType>((days, event) => {
    const eventDay = moment(event.start.dateTime).format('dddd')

    const weekType = event.extendedProperties.shared.weekType

    if (eventDay in days) {
      if(!days[eventDay][weekType]) {
        days[eventDay][weekType] = []
      }
      days[eventDay][weekType].push(event)
    } else {
      days[eventDay] = {
        [weekType]: []
      }

      days[eventDay][weekType].push(event)
    }
    
    days[eventDay][weekType].sort((a,b) => moment(a.start.dateTime).valueOf() - moment(b.start.dateTime).valueOf())

    return days
  }, {})
})

const deleteEvent = (id) => {
  const index = state.events.findIndex(event => event.id === id)
  state.events.splice(index, 1)
}
</script>