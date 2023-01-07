<template>
  <div class="schedule__wrapper">
    List: total {{ schedulesRef.schedules.length }} schedules
    <ul class="schedule__list" v-if="schedulesRef.schedules.length">
      <ScheduleItem
        v-for="schedule in schedulesRef.schedules"
        :key="schedule.id" 
        :schedule="schedule"
        @DELETE="loadSchedules"
      />
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { ISchedule } from "@/interfaces/interfaces";
import ScheduleItem from '@/components/ScheduleItem.vue';
import { ScheduleEmit } from '@/constants/emits'
import api from "@/utils/api";
import { onMounted, reactive, ref, toRef, toRefs, watch } from "@vue/runtime-core";

const props = defineProps({
  schedules: Array as () => ISchedule[]
})

const schedulesRef = reactive({
  schedules: props.schedules
})

const loadSchedules = async () => {
  const schedules = await fetch(`${import.meta.env.PUBLIC_API_URL}/${api.schedules.fetch()}`)
    .then(response => response.json())

  schedulesRef.schedules = schedules
}
</script>


