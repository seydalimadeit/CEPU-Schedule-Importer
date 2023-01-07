<template>
  <div>
    <span>Расписание: {{ schedule.name }}</span>
    <button @click="save">save</button>
    <div>
      <ScheduleEvent 
        v-for="event in schedule.events"
        :key="event.id"
        :event.sync="event"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ISchedule } from '@/interfaces/interfaces'
import ScheduleEvent from '@/components/ScheduleEvent.vue'

import { FetchMethods } from '@/constants/fetch';
import api from '@/utils/api';

const props = defineProps({
  schedule: Object as () => ISchedule
})

const save = async () => {
  const params = {
    method: FetchMethods.PATCH,
    body: JSON.stringify(props.schedule),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }

  await fetch(`${import.meta.env.PUBLIC_API_URL}/${api.schedules.fetchById(props.schedule.id)}`, params)
}
</script>
