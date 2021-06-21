import Vue from 'vue'
import App from './App.vue'
import VueCompositionAPI from '@vue/composition-api'
import vuetify from './plugins/vuetify'
import VueI18n from 'vue-i18n'
import Message from './messages'

Vue.config.productionTip = false
Vue.use(VueCompositionAPI);
Vue.use(VueI18n);

require("./assets/scss/main.scss")

const messages = Message.message;
const i18n = new VueI18n({
  locale: getBrowserLocale({ countryCodeOnly: true }), // set locale
  fallbackLocale: 'fr',
  messages, // set locale messages
})

new Vue({
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')

export default function getBrowserLocale(options = {}) {
  const defaultOptions = { countryCodeOnly: false }
  const opt = { ...defaultOptions, ...options }
  const navigatorLocale =
    navigator.languages !== undefined
      ? navigator.languages[0]
      : navigator.language
  if (!navigatorLocale) {
    return undefined
  }
  const trimmedLocale = opt.countryCodeOnly
    ? navigatorLocale.trim().split(/-|_/)[0]
    : navigatorLocale.trim()
  return trimmedLocale
}