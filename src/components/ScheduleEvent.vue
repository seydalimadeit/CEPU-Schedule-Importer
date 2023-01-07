<template>
  <div class="schedule__event">
    <input v-model="eventRef.summary.name">
    <input v-model="eventRef.description">
    <span>start: <VueTimepicker v-model="startTime" /> </span>
    <span>end: <VueTimepicker v-model="endTime" /> </span>
    <span>{{ eventRef.extendedProperties }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from '@vue/runtime-core'
import VueTimepicker from 'vue3-timepicker'
import moment from 'moment'
const props = defineProps({
  event: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:event'])

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
</script>
