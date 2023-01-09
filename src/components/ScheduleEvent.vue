<template>
  <div class="schedule__event">
    <div class="schedule__event-item">
      <button @click="deleteEvent">delete</button>
      <input v-model="eventRef.summary.name">
      <input v-model="eventRef.description">
      <span>start: <VueTimepicker v-model="startTime" /> </span>
      <span>end: <VueTimepicker v-model="endTime" /> </span>
      <span>{{ eventRef.extendedProperties }}</span>
      <select v-model="eventRef.extendedProperties.shared.weekType">
        <option value="both" selected>both</option>
        <option value="numerator">numerator</option>
        <option value="denominator">denominator</option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch, reactive, ref, toRef } from '@vue/runtime-core'
import VueTimepicker from 'vue3-timepicker'
import moment from 'moment'
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
    return moment(props.event.start.dateTime).format('HH:mm')
  },

  set(selectedTime) {
    const [hour, minute] = selectedTime.split(':')

    const dateTime = moment(props.event.start.dateTime)
      .hour(Number(hour))
      .minute(Number(minute))
      .format()

    props.event.start.dateTime = dateTime
  }
})

const endTime = computed({
  get() {
    return moment(props.event.end.dateTime).format('HH:mm')
  },

  set(selectedTime) {
    const [hour, minute] = selectedTime.split(':')

    const dateTime = moment(props.event.end.dateTime)
      .hour(Number(hour))
      .minute(Number(minute))
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
    switch (true) {
      case weekType === 'numerator':
        console.log('weekType numerator');
        break;
      case weekType === 'denominator':
        console.log('weekType denominator');
        break;
      case weekType === 'both':
        console.log('break');
        break;
    }
  },
);

// both - unchanged
// numeric - interval 2
// denumeric - interval 2, add 1 week to startDate
</script>
