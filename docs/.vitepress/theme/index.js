// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import './index.css'
import CustomLayout from './Layout.vue'

export default {
  extends: DefaultTheme,
  Layout: CustomLayout
}
