<template>
  <div class="main__input-input" v-if="ableToSelect">
    <ComponentVSelect 
      v-model.trim="scheduleId"  
      :options="schedules" 
      :reduce="schedule => schedule.id" 
      label="name"
    />
    <button class="main__input-btn" @click="login">Import</button>
  </div>

  <Alert :type="AlertType.SUCCESS" v-if="success">
    Success alert!
  </Alert>

  <Alert :type="AlertType.ERROR" v-if="error">
    Error alert!
  </Alert>

  <Alert :type="AlertType.WARNING" v-if="loading">
    Loading alert!
  </Alert>
</template>

<script setup lang="ts">
import { computed, ref } from '@vue/runtime-core'
import { googleSdkLoaded } from "vue3-google-login"
import { AlertType } from '@/constants/alert'
import Alert from '@/components/Alert.vue'
import type { IResponse } from '@/interfaces/interfaces';

defineProps({
  schedules: Array
})

const scheduleId = ref('')
const isLoading = ref(false)
const isSuccess = ref(false)
const isError = ref(false)

const loading = computed(() => isLoading.value && !isSuccess.value)
const success = computed(() => !isLoading.value && isSuccess.value)
const error = computed(() => !isLoading.value && isError.value)

const ableToSelect = computed(() => !loading.value && !success.value && !error.value)

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
  isLoading.value = true
  const params = new URLSearchParams({
    code: response.code,
    scheduleId: scheduleId.value
  })

  return await fetch(`${import.meta.env.PUBLIC_API_URL}/auth/token?${params}`)
    .then(() => {
      isLoading.value = false
      isSuccess.value = true
    })
    .catch(() => {
      isLoading.value = false
      isError.value = true
    })
}
</script>

