import Alert from '@/components/alert/Alert.vue'
import { render, RenderOptions, screen } from '@testing-library/vue'
import { beforeEach, describe, expect } from 'vitest'
import * as config from '@/config/config'
import { loadEnv } from 'vite';
import { AlertType } from '@/constants/alert';
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
    }
  },
  props: {
    type: AlertType.SUCCESS
  },
  slots: {
    default: 'Some message'
  }
}

describe('Alert component', () => {
  let wrapper

  beforeEach(() => {
    wrapper = render(Alert, options)
  })

  test('Alert component is defined', async () => {
    expect(wrapper).toBeDefined()
  })

  test('Text is correct', () => {
    const { getByText } = wrapper
    
    expect(getByText('Some message')).toBeDefined()
  })

  test('Icon is correct', async () => {
    const { getByTitle } = wrapper
    expect(getByTitle('circle-check')).toBeDefined()
    
    options.props.type = AlertType.ERROR
    await render(Alert, options)

    expect(getByTitle('circle-xmark')).toBeDefined()
  })
})