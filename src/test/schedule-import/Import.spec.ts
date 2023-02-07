import Import from '@/components/schedule-import/Import.vue'
import { render, RenderOptions } from '@testing-library/vue'
import { beforeEach, describe, expect } from 'vitest'
import * as config from '@/config/config'
import { loadEnv } from 'vite';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const i18n = config.i18n

Object.assign(process.env, loadEnv('development', './', ''))

const options: RenderOptions = {
  global: {
    plugins: [
      i18n
    ],
    components: {
      FAIcon: FontAwesomeIcon
    },
    stubs: {
      GroupSelect: { template: '<p>GroupSelect</p>', }
    }
  },
  props: {
    schedules: []
  },
}

describe('Import component', () => {
  let wrapper

  beforeEach(() => {
    wrapper = render(Import, options)
  })

  test('Import component is defined', () => {
    expect(wrapper).toBeDefined()
  })

  test('if schedules array is empty show alert', async () => {
    const { getByText } = wrapper
    expect(getByText('Ошибка при загрузке расписания.')).toBeDefined()

    options.props.schedules = [{}]
  })

  test('if schedules array is empty show alert', async () => {
    const { getByText } = wrapper
    
    expect(getByText('GroupSelect')).toBeDefined()
  })
})