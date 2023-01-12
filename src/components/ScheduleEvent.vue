<template>
  <div class="schedule__event">
    <div class="schedule__event-item">
      <button @click="deleteEvent">delete</button>
      <input v-model="eventRef.summary.name">
      <input v-model="eventRef.description">
      <span>start: <Datepicker v-model="startTime" time-picker /> </span>
      <span>end: <Datepicker v-model="endTime" time-picker /> </span>
      <select v-if="eventRef.recurrence.length" v-model="eventRef.extendedProperties.shared.weekType">
        <option value="both" selected>both</option>
        <option value="numerator">numerator</option>
        <option value="denominator">denominator</option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from '@vue/runtime-core'
import Datepicker from '@vuepic/vue-datepicker';
import moment from 'moment'
import { RRule } from 'rrule'

const props = defineProps({
  event: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:event', 'delete'])

const deleteEvent = () => {
  emit('delete', props.event.id)
}

const startTime = computed({
  get() {
    const time = new Date(props.event.start.dateTime)
    return {
      hours: time.getHours(),
      minutes: time.getMinutes()
    }
  },

  set(selectedTime: any) {
    const dateTime = moment(props.event.start.dateTime)
      .hour(Number(selectedTime.hours))
      .minute(Number(selectedTime.minutes))
      .format()

    props.event.start.dateTime = dateTime
  }
})

const endTime = computed({
  get() {
    const time = new Date(props.event.end.dateTime)
    return {
      hours: time.getHours(),
      minutes: time.getMinutes()
    }
  },

  set(selectedTime: any) {
    const dateTime = moment(props.event.end.dateTime)
      .hour(Number(selectedTime.hours))
      .minute(Number(selectedTime.minutes))
      .format()

    props.event.end.dateTime = dateTime
  }
})

const eventRef = computed({
  get() {
    return props.event
  },
  set(updatedEvent) {
    emit('update:event', updatedEvent)
  }
})

watch(
  () => props.event.extendedProperties.shared.weekType, 
  (weekType) => {
    const rule = RRule.fromString(props.event.recurrence.toString())
    
    switch (true) {
      case weekType === 'numerator':    
        rule.origOptions.interval = 2
        props.event.recurrence = rule.toString()
        break;
      case weekType === 'denominator':
        rule.origOptions.interval = 2
        props.event.recurrence = rule.toString()

        const startDateTime = moment(props.event.start.dateTime).add(1, 'week').format()
        const endDateTime = moment(props.event.end.dateTime).add(1, 'week').format()

        props.event.start.dateTime = startDateTime
        props.event.start.dateTime = endDateTime
        break;
      case weekType === 'both':
        break;
    }
  },
);
</script>
