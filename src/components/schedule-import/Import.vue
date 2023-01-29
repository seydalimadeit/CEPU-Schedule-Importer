<template>
  <main>
		<h1 class="heading" v-html="t('import.heading')"></h1>
    <div class="main__input">
      <span class="main__input-description" v-html="t('import.subheading')"></span>
      <GroupSelect 
        v-if="schedules.length"
        :schedules="schedules"
      />

      <Alert v-else :type="AlertType.ERROR">
        {{ t('schedule.error.load') }}
      </Alert>
    </div>
    <img class="hero__img" src="/images/people.svg" alt="People" />
	</main>
</template>

<script setup lang="ts">
import { AlertType } from '@/constants/alert';
import { ISchedule } from '@/interfaces/interfaces';
import { PropType } from 'vue';
import { useI18n } from 'vue-i18n';
import Alert from '../alert/Alert.vue';
import GroupSelect from './GroupSelect.vue';

const { t } = useI18n()

defineProps({
  schedules: Array as PropType<ISchedule[]>
})
</script>