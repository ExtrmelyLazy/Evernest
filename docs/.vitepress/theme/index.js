// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import HeroHeader from './components/HeroHeader.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('HeroHeader', HeroHeader)
  }
}
