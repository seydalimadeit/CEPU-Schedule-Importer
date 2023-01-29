<template>
  <div class="login__wrapper">
    <h2>
      {{ t('login.messages.required') }}
    </h2>
    <div>
      <Alert v-if="tokenValidationStatus !== null" :type="alert.type">
        {{ alert.message }}
      </Alert>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { googleOneTap } from 'vue3-google-login';
import { useCookie } from 'vue-cookie-next'
import endpoints from '@/utils/endpoints';
import { useI18n } from 'vue-i18n';
import Alert from '../alert/Alert.vue';
import { AlertType } from '@/constants/alert';
import { computed } from '@vue/reactivity';
import type { IAlert } from '@/interfaces/interfaces'

const cookie = useCookie();
const { t } = useI18n()

const tokenValidationStatus = ref<number>(null)

const alert = computed<IAlert>(() => {
  return {
    message: t(tokenValidationStatus.value === 200 ? 'login.messages.success' : `error.http.${tokenValidationStatus.value}`),
    type: tokenValidationStatus.value === 200 ? AlertType.SUCCESS : AlertType.ERROR
  }
})

const oneTap = () => {
  googleOneTap({
    clientId: import.meta.env.PUBLIC_GOOGLE_CLIENT_ID,
    autoLogin: true,
    cancelOnTapOutside: false
  })
    .then(async (response) => {
      const { credential } = response
      cookie.setCookie('token', credential);

      const request = await fetch(`${import.meta.env.PUBLIC_API_URL}${endpoints.auth.validateToken()}`, {
        headers: {
          'Content-type' : 'application/json'
        },
        credentials: 'include'
      })

      tokenValidationStatus.value = request.status

      if(!(tokenValidationStatus.value === 200)) { 
        return oneTap() 
      }

      window.location.reload()
    })
    .catch(() => {
      cookie.removeCookie('token')
    })
}

onMounted(() => {
  cookie.removeCookie('token')

  oneTap()
})
</script>