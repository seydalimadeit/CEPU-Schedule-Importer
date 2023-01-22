<template>
  <div
    :class="[
      'schedule__event',
      eventValidationClass
    ]"
  >
    <div>
      <div class="schedule__event-header">
        <div class="schedule__event-input-group">
          <span>Title:</span>

          <div class="schedule__event-input-field">
            <input
              :class="[
                'schedule__input',
                [v$.summary.name.$invalid ? 'schedule__input--invalid' : 'schedule__input--valid']
              ]"
              v-model.trim="v$.summary.name.$model"
            >
            <label 
              class="schedule__input-label schedule__input-label--error"
              v-if="v$.summary.name.$errors.length"
              v-for="error in v$.summary.name.$errors"
              :key="error"
            >
              {{ error.$message }}
            </label>
          </div>
        </div>
        <button 
          class="schedule__list-item-actions--action" 
          @click="deleteEvent"
        >
          <FAIcon :icon="deleteIcon" />
        </button>
      </div>

      <div class="schedule__event-input-group">
        <span>Description:</span>

        <div class="schedule__event-input-field">
          <input
            :class="[
              'schedule__input',
              [v$.description.$invalid ? 'schedule__input--invalid' : 'schedule__input--valid']
            ]"
            v-model.trim="v$.description.$model"
          >
          <label 
            class="schedule__input-label schedule__input-label--error"
            v-if="v$.description.$errors.length"
            v-for="error in v$.description.$errors"
            :key="error"
          >
            {{ error.$message }}
          </label>
        </div>
      </div>

      <div class="schedule__event-input-group">
        <span>Start time:</span>
        <Datepicker 
          v-model="startTime" 
          :time-picker="!props.dateSelect"
          :clearable="false"
        />
      </div>

      <div class="schedule__event-input-group">
        <span>End time:</span>
        <Datepicker 
          v-model="endTime" 
          :time-picker="!props.dateSelect"
          :clearable="false"
        />
      </div>

      <div class="schedule__event-input-group">
        <span>Week type:</span>
        <select 
          :class="[
            'schedule__input',
            [v$.extendedProperties.shared.weekType.$invalid ? 'schedule__input--invalid' : 'schedule__input--valid']
          ]"
          v-model="v$.extendedProperties.shared.weekType.$model"
          @change="changeWeekType"
        >
          <option value="both" selected>both</option>
          <option value="numerator">numerator</option>
          <option value="denominator">denominator</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, PropType } from '@vue/runtime-core'
import Datepicker from '@vuepic/vue-datepicker';
import moment from 'moment'
import { RRule } from 'rrule'
import type { IEvent } from '@/interfaces/interfaces'

import { useVuelidate } from '@vuelidate/core'
import { required, minLength, helpers } from '@vuelidate/validators'
import { ScheduleEmit } from '@/constants/emits';
import { ValidationMessages } from '@/helpers/messages';

const props = defineProps({
  event: {
    required: true,
    type: Object as PropType<IEvent>,
  },
  dateSelect: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits([ScheduleEmit.DELETE])

const deleteIcon = 'trash'

const rules = computed(() => ({
  description: {
    required: helpers.withMessage(ValidationMessages.REQUIRED, required),
    minLength: minLength(1)
  },
  start: {
    required: helpers.withMessage(ValidationMessages.REQUIRED, required),
    dateTime: {
      required,
      minValue: value => moment(value).isValid()
    },
    timeZone: {
      required,
      minLength: minLength(1)
    }
  },
  end: {
    required: helpers.withMessage(ValidationMessages.REQUIRED, required),
    dateTime: {
      required,
      minValue: value => moment(value).isValid() && moment(value).isAfter(moment(props.event.start.dateTime))
    },
    timeZone: {
      required,
      minLength: minLength(1)
    }
  },
  recurrence: {},
  extendedProperties: {
    shared: {
      weekType: {}
    }
  },
  reminders: {
    required: helpers.withMessage(ValidationMessages.REQUIRED, required),
  },
  summary: {
    name: {
      required: helpers.withMessage(ValidationMessages.REQUIRED, required),
      minLength: minLength(1)
    },
  } 
}))

const v$ = useVuelidate<IEvent>(rules, props.event)

onMounted(() => {
  v$.value.$touch()
})

const eventValidationClass = computed(() => {
  return v$.value.$invalid
    ? 'schedule__event--invalid'
    : 'schedule__event--valid' 
})

const deleteEvent = () => {
  emit(ScheduleEmit.DELETE)
}

const startTime = computed({
  get() {
    if(props.dateSelect) {
      return props.event.start.dateTime
    }

    const time = new Date(props.event.start.dateTime)
    return {
      hours: time.getHours(),
      minutes: time.getMinutes()
    }
  },

  set(selectedTime: any) {
    if(props.dateSelect) {
      props.event.start.dateTime = moment(selectedTime).format()
      return
    }

    const dateTime = moment(props.event.start.dateTime)
      .hour(Number(selectedTime.hours))
      .minute(Number(selectedTime.minutes))
      .format()

    props.event.start.dateTime = dateTime
  }
})

const endTime = computed({
  get() {
    if(props.dateSelect) {
      return props.event.end.dateTime
    }

    const time = new Date(props.event.end.dateTime)
    return {
      hours: time.getHours(),
      minutes: time.getMinutes()
    }
  },

  set(selectedTime: any) {
    if(props.dateSelect) {
      props.event.end.dateTime = moment(selectedTime).format()
      return
    }
    
    const dateTime = moment(props.event.end.dateTime)
      .hour(Number(selectedTime.hours))
      .minute(Number(selectedTime.minutes))
      .format()

    props.event.end.dateTime = dateTime
  }
})

const changeWeekType = (event) => {
  const weekType = event.target.value
  
  const rule = RRule.fromString(props.event.recurrence.toString())
    
  switch (true) {
    case weekType === 'numerator':    
      rule.origOptions.interval = 2
      props.event.recurrence = [rule.toString()]
      break;
    case weekType === 'denominator':
      rule.origOptions.interval = 2
      props.event.recurrence = [rule.toString()]

      const startDateTime = moment(props.event.start.dateTime).add(1, 'week').format()
      const endDateTime = moment(props.event.end.dateTime).add(1, 'week').format()

      props.event.start.dateTime = startDateTime
      props.event.end.dateTime = endDateTime
      break;
    case weekType === 'both':
      break;
  }
}
</script>
