import Footer from '@/components/layout/Footer.vue'
import { render, RenderOptions } from '@testing-library/vue'
import { beforeEach, describe, expect,  vi } from 'vitest'
import * as config from '@/config/config'
import { loadEnv } from 'vite';

const i18n = config.i18n

Object.assign(process.env, loadEnv('development', './', ''))

const options: RenderOptions = {
  global: {
    plugins: [
      i18n
    ],
    provide: {
      cookie: {
        getCookie: vi.fn()
      },
    },
  },
}

describe('Footer component', () => {
  let wrapper

  beforeEach(() => {
    wrapper = render(Footer, options)
  })

  test('Footer component is defined', async () => {
    expect(wrapper).toBeDefined()
  })

  test('Edit schedules link is right', () => {
    const { getByText } = wrapper
    
    const link = getByText('Редактировать расписания').closest('a')
    const href = link.getAttribute('href')
    
    expect(href).toBe('/schedules')
  })

  test('Feedback bot link is right', async () => {
    const { getByText } = wrapper

    const link = getByText('TG Bot').closest('a')
    const href = link.getAttribute('href')

    expect(href).toBe(import.meta.env.PUBLIC_FEEDBACK_TG_BOT_URL)
  })
})