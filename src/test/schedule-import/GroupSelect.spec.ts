import GroupSelect from '@/components/schedule-import/GroupSelect.vue'
import { render, RenderOptions, fireEvent } from '@testing-library/vue'
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
  },
  props: {
    schedules: [
      { id: '1', name: 'schedule-1' },
      { id: '2', name: 'schedule-2' }
    ]
  },
}

describe('GroupSelect component', () => {
  let wrapper

  beforeEach(() => {
    wrapper = render(GroupSelect, options)
  })

  test('GroupSelect component is defined', () => {
    expect(wrapper).toBeDefined()
  })

  test('if schedules array is empty show alert', async () => {
    const { getByText } = wrapper
    expect(getByText('schedule-1')).toBeDefined()
    expect(getByText('schedule-2')).toBeDefined()
  })

  test('if schedules array is empty show alert', async () => {
    const { getByLabelText } = wrapper
    const groupNameInput = getByLabelText('Поиск...')

    // fireEvent.update()
  })
})