<template>
  <div>
    You have to login to access this page
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { googleOneTap } from 'vue3-google-login';
import { useCookie } from 'vue-cookie-next'
import endpoints from '@/utils/endpoints';

const cookie = useCookie();

onMounted(() => {
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

      console.log(request);

      // window.location.reload()
    })
    .catch(() => {
      cookie.removeCookie('token')
    })
})
</script>