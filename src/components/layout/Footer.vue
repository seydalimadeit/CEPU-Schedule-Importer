<template>
  <div class="footer">
    <div>
      <a href="/schedules">
        {{ t('schedule.edit', 2) }}
      </a>
    </div>
    <div>
      <span>
        <a :href="botURL" target="_blank">
          {{ t('contact.us.title') }}  
        </a>
      </span> 
      | 
      <select v-model="$i18n.locale" @change="saveSelectedLang">
        <option v-for="locale in availableLocales" :value="locale">{{ locale }}</option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useCookie } from 'vue-cookie-next';
import { useI18n } from 'vue-i18n';
const cookie = useCookie();

const { t, availableLocales, locale } = useI18n({ useScope: 'global' })

const saveSelectedLang = () => {
  cookie.setCookie('lang', locale.value as string)
}

const botURL = import.meta.env.PUBLIC_FEEDBACK_TG_BOT_URL

onMounted(() => {
  locale.value = cookie.getCookie('lang') || 'ru'
})
</script>