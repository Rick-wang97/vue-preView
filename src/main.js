import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
Vue.use(ElementUI);


import Viewer from 'v-viewer' // 图片预览
import 'viewerjs/dist/viewer.css'

Vue.use(Viewer)

Viewer.setDefaults({
  Options: {
    'zIndex': 9999,
    'inline': true,
    'button': true,
    'navbar': true,
    'title': true,
    'toolbar': true,
    'tooltip': true,
    'movable': true,
    'zoomable': true,
    'rotatable': true,
    'scalable': true,
    'transition': true,
    'fullscreen': true,
    'keyboard': true,
    'url': 'data-source'
  }
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
