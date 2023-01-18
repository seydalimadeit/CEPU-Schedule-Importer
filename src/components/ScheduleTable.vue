<template>
  <ul class="schedule__list">
    <div class="schedule__list-header">
      <span>
        Schedules
      </span>
      <span>
        Actions
      </span>
    </div>
    <ScheduleItem
      v-for="schedule in searchedSchedules"
      :key="schedule.id" 
      :schedule="schedule"
      @DELETE="$emit(ScheduleEmit.DELETE)"
    />
  </ul>
</template>

<script setup lang="ts">
import ScheduleItem from '@/components/ScheduleItem.vue';
import { ScheduleEmit } from '@/constants/emits';
import type { ISchedule } from '@/interfaces/interfaces';
import type { PropType } from 'vue';
defineProps({
  searchedSchedules: {
    required: true,
    type: Array as PropType<ISchedule[]>
  }
})
defineEmits([ScheduleEmit.DELETE])
</script>