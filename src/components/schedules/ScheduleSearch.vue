<template>
  <div class="schedule__search">
    <input 
      type="text" 
      v-model.trim="searchValue" 
      class="schedule__search-input"
      placeholder="Search..."
    >
  </div>
</template>

<script setup lang="ts">
import { SearchEvent } from '@/constants/emits';
import { computed } from '@vue/reactivity';

const props = defineProps({
  search: {
    required: true,
    type: String
  }
})

const emit = defineEmits([SearchEvent.UPDATE])

const searchValue = computed({
  get: () => props.search,
  set: (value) => { 
    emit(SearchEvent.UPDATE, value)
  }
})

</script>