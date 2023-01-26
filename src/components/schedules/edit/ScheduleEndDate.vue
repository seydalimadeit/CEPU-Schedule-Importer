<template>
  <div class="schedule__edit-enddate">
    <span class="schedule__edit-enddate-label">Schedule end date:</span>
    <Datepicker 
      :class="[
        'schedule__edit-enddate-selector',
        validationClass
      ]"
      v-model="v$.date.$model" 
      :enable-time-picker="false" 
      :clearable="false"
    />
  </div>
</template>

<script setup lang="ts">
import { ScheduleEmit } from '@/constants/emits';
import { computed, reactive } from '@vue/reactivity';
import { watch } from '@vue/runtime-core';
import useVuelidate from '@vuelidate/core';
import Datepicker from '@vuepic/vue-datepicker';
import { required } from '@vuelidate/validators'

const props = defineProps({
  endDate: Date
})

const emit = defineEmits([ScheduleEmit.UPDATE_END_DATE])

const state = reactive({
  date: props.endDate
})

watch(() => state.date, () => {
  emit(ScheduleEmit.UPDATE_END_DATE, state.date)
})

const rules = {
  date: {
    required,
    minValue: (value) => new Date(value) > new Date()
  }
}

const v$ = useVuelidate(rules, state)

const validationClass = computed(() => {
  return v$.value.$invalid 
    ? 'schedule__edit-enddate-selector--invalid' 
    : 'schedule__edit-enddate-selector--valid'
})
</script>