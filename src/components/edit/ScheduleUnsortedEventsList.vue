<template>
  <div>
    <span class="schedule__event-list-day">
      Unsorted events
      <button @click="addEvent">
        <FAIcon icon="circle-plus" />
      </button>
    </span>

    <div class="schedule__event-list">
      <ScheduleEvent 
        v-for="(event, index) in state.events"
        :key="index"
        :event="event"
        date-select
        @DELETE="deleteEvent(index)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IEvent, IEventReminders } from '@/interfaces/interfaces';
import { PropType, reactive } from 'vue';
import moment from 'moment';
import ScheduleEvent from '../ScheduleEvent.vue';
import { ScheduleEvent as Event } from '@/classes/event.class';

const props = defineProps({
  events: {
    required: true,
    type: Array as PropType<IEvent[]>
  },
})

const state = reactive({
  events: props.events
})

const deleteEvent = (index) => {
  props.events.splice(index, 1)
}

const addEvent = () => {
  const description = ''
  const end = {
    dateTime: moment().format(),
    timeZone: 'Europe/Simferopol'
  }
  const start = {
    dateTime: moment().format(),
    timeZone: 'Europe/Simferopol'
  }
  const extendedProperties = {
    shared: {
      weekType: 'both'
    }
  }
  const location = "КИПУ"
  const reminders: IEventReminders = {
    useDefault: false,
    overrides: [
      {
        method: "popup",
        minutes: 10
      }
    ]
  }
  const recurrence: string[] = []
  const summary = {
    name: ''
  }

  const event: IEvent = new Event(
    description, 
    end, 
    start, 
    extendedProperties, 
    location, 
    reminders, 
    recurrence, 
    summary
  )

  state.events.push(event)
}
</script>