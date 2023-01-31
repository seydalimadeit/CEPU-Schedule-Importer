<template>
  <div class="footer">
    <div>
      <a href="/schedules">
        {{ t('schedule.edit', 2) }}
      </a>
    </div>
    <div>
      <span 
        v-for="locale in availableLocales" 
        @click="changeLocale"
      >
        {{ locale }} /
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t, availableLocales, locale } = useI18n({ useScope: 'global' })

const changeLocale = lang => locale.value = lang
</script>