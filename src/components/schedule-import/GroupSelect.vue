<template>
  <div class="main__input-input" v-if="!alert.type && !alert.message">
    <ComponentVSelect 
      v-model.trim="scheduleId"  
      :options="schedules" 
      :reduce="schedule => schedule.id" 
      label="name"
    />
    <button class="main__input-btn" @click="login">
      {{ t('import.title') }}
    </button>
  </div>

  <div class="alert__wrapper">
    <Alert 
      v-if="alert.type && alert.message" 
      :type="alert.type"
    >
      {{ alert.message }}
    </Alert>
  </div>
</template>

<script setup lang="ts">
import { PropType, ref } from '@vue/runtime-core'
import { googleSdkLoaded } from "vue3-google-login"
import { AlertType } from '@/constants/alert'
import Alert from '@/components/alert/Alert.vue'
import type { IAlert, IResponse, ISchedule } from '@/interfaces/interfaces';
import { useI18n } from 'vue-i18n';
import { reactive } from 'vue';

const { t } = useI18n()

defineProps({
  schedules: Object as PropType<ISchedule[]>
})

const scheduleId = ref('')

const alert = reactive<IAlert>({
  message: null,
  type: null
})

const login = () => {
  googleSdkLoaded((google) => {
    google.accounts.oauth2.initCodeClient({
      client_id: import.meta.env.PUBLIC_GOOGLE_CLIENT_ID,
      scope: 'https://www.googleapis.com/auth/calendar',
      callback: (response) => importCalendar(response)
    }).requestCode()
  })
}

const importCalendar = async (response: IResponse) => {
  alert.type = AlertType.WARNING
  alert.message = t('import.status.loading') 

  const params = new URLSearchParams({
    code: response.code,
    scheduleId: scheduleId.value
  })

  return await fetch(`${import.meta.env.PUBLIC_API_URL}auth/token?${params}`)
    .then((response) => {
      return response.ok ? response.json() : Promise.reject(response)
    })
    .then(() => {
      alert.type = AlertType.SUCCESS
      alert.message = t('import.status.success') 
    })
    .catch((response) => {
      alert.type = AlertType.ERROR
      alert.message = t(`error.http.${response.status}`)
    })
}
</script>

