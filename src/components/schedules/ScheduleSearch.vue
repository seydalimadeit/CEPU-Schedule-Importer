<template>
  <div class="schedule__search">
    <input 
      type="text" 
      v-model.trim="searchValue" 
      class="schedule__search-input"
      :placeholder="t('placeholder.search')"
    >

    <input 
      hidden 
      ref="fileUpload" 
      name='files[]' 
      multiple 
      accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      @change="uploadFile" 
      type="file"
    />

    <button class="schedule__search-btn-upload" @click="uploadSchedule">{{ t('schedule.upload.schedule') }}</button>
  </div>
</template>

<script setup lang="ts">
import { ScheduleEmit, SearchEvent } from '@/constants/emits';
import { computed } from '@vue/reactivity';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import api from "@/utils/endpoints";
import { FetchMethods } from '@/constants/fetch';

const { t } = useI18n()

const props = defineProps({
  search: {
    required: true,
    type: String
  }
})

const fileUpload = ref(null)

const emit = defineEmits([SearchEvent.UPDATE, ScheduleEmit.UPLOADED])

const uploadSchedule = () => {
  fileUpload.value.click()
}

const uploadFile = async (event) => {
  const files = event.target.files
  if(files.length) {
    await Promise.all(
      Array.from(files).map(async (file: any) => {
        const uploadedFile = new File([file], encodeURIComponent(file.name));
        const data = new FormData()
        data.append('file', uploadedFile)

        const params: RequestInit = {
          credentials: 'include',
          method: FetchMethods.POST,
          body: data
        }

        await fetch(`${import.meta.env.PUBLIC_API_URL}${api.schedules.fetch()}`, params) 
      })
    )

    emit(ScheduleEmit.UPLOADED)
  }
}

const searchValue = computed({
  get: () => props.search,
  set: (value) => { 
    emit(SearchEvent.UPDATE, value)
  }
})

</script>