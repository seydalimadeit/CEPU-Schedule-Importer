<template>
  <li class="schedule__list-item">
    <span>
      {{ schedule.name }}
    </span>
    <div class="schedule__list-item-actions">
      <a 
        :href="`/schedules/${schedule.id}/edit`" 
        class="schedule__list-item-actions--action"
      >
        <FAIcon :icon="editIcon" />
      </a>
      <button 
        @click="deleteSchedule(schedule.id)" 
        class="schedule__list-item-actions--action"
      >
        <FAIcon :icon="deleteIcon" />
      </button>
    </div>
  </li>
</template>

<script setup lang="ts">
import type { ISchedule } from '@/interfaces/interfaces'
import api from '@/utils/api'
import { FetchMethods } from '@/constants/fetch'
import { ScheduleEmit } from '@/constants/emits'

const editIcon = 'pen-to-square'
const deleteIcon = 'trash'

defineProps({
  schedule: Object as () => ISchedule
})

const emit = defineEmits([
  ScheduleEmit.EDIT, 
  ScheduleEmit.DELETE
])

const deleteSchedule = async (id: string) => {
  const confirmed = confirm("Are you sure?");

  const params = {
    method: FetchMethods.DELETE
  }
  
  if(confirmed) {
    await fetch(`${import.meta.env.PUBLIC_API_URL}/${api.schedules.fetchById(id)}`, params)
    emit(ScheduleEmit.DELETE)
  }
}
</script>
