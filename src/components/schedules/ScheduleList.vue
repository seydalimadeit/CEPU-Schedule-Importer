<template>
  <div class="schedule__wrapper">
    <h2 class="schedule__title">{{ t('schedule.title', 2) }} ({{ state.schedules.length }})</h2>

    <ScheduleSearch
      :search="state.search"
      @UPDATE:SEARCH="updateSearch"
    />

    <ScheduleTable
      v-if="state.schedules.length"
      :searchedSchedules="searchedSchedules"
      @DELETE="loadSchedules"
    />
  </div>
</template>

<script setup lang="ts">
import type { ISchedule } from "@/interfaces/interfaces";
import ScheduleTable from '@/components/schedules/ScheduleTable.vue';
import api from "@/utils/endpoints";
import { reactive, computed } from "@vue/runtime-core";
import ScheduleSearch from "./ScheduleSearch.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n()

interface State {
  search: string,
  schedules: ISchedule[]
}

const props = defineProps({
  schedules: Array as () => ISchedule[]
})

const state = reactive<State>({
  search: '',
  schedules: props.schedules
})

const updateSearch = (value: string): void => {
  state.search = value
}

const searchedSchedules = computed(() => {
  return state.schedules.filter(schedule => {
    return schedule.name
      .toLowerCase()
      .includes(state.search)
  })
})

const loadSchedules = async () => {
  const schedules = await fetch(`${import.meta.env.PUBLIC_API_URL}/${api.schedules.fetch()}`)
    .then(response => response.json())

  state.schedules = schedules
}
</script>


