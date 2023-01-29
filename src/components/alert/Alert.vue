<template>
  <div :class="className">
    <div class="alert__icon">
      <FAIcon :icon="icon" />
    </div>
    <div class="alert__text">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from '@vue/runtime-core'
import { AlertType } from '@/constants/alert'

const props = defineProps({
  type: String
})

const className = computed(() => {
  return `alert alert__${props.type?.toLowerCase()}`
})

const icon = computed(() => {
  switch (props.type) {
    case AlertType.SUCCESS:
      return 'circle-check'
    case AlertType.ERROR:
      return 'circle-xmark'
    case AlertType.WARNING:
      return 'triangle-exclamation'
  }
})
</script>
