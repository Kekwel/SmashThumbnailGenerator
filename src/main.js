import Vue from 'vue'
import App from './App.vue'
import VueCompositionAPI from '@vue/composition-api'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false
Vue.use(VueCompositionAPI)

require("./assets/scss/main.scss")

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
