<template>
  <div 
    :class="[
      'schedule__edit-header', 
      { 'schedule__edit-header--invalid' : v$.name.$invalid }
    ]"
  >
    <h2>
      {{ t('schedule.entity.title') }}: 
      <input 
        :class="[
          'schedule__edit-input',
          validationClass
        ]" 
        v-model.trim="v$.name.$model"
      >
    </h2>
    <button 
      :class="[
        'schedule__edit-btn',
        [ isValid ? 'schedule__edit-btn--valid' : 'schedule__edit-btn--invalid' ]
      ]"
      @click="$emit(ScheduleEmit.SAVE)"
    >
      {{ t('schedule.save.title') }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ScheduleEmit } from '@/constants/emits';
import { computed, reactive } from '@vue/reactivity';
import { watch } from '@vue/runtime-core';
import useVuelidate from '@vuelidate/core';
import { required, minLength } from '@vuelidate/validators'
import { useI18n } from 'vue-i18n';

const { t } = useI18n()

const props = defineProps({
  name: {
    required: true,
    type: String
  },
  isValid: {
    required: true,
    type: Boolean
  }
})

const rules = {
  name: {
    required,
    minLength: minLength(3)
  }
}

const state = reactive({
  name: props.name
})

const emit = defineEmits([ScheduleEmit.UPDATE_NAME, ScheduleEmit.SAVE])

watch(() => state.name, () => {
  emit(ScheduleEmit.UPDATE_NAME, state.name)
})

const v$ = useVuelidate(rules, state)

const validationClass = computed(() => {
  return v$.value.name.$invalid ? 'schedule__input--invalid': 'schedule__input--valid'
})
</script>