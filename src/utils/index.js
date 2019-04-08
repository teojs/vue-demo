import Vue from 'vue'
import apis from '../service/apis'
const plugin = {}
plugin.install = function() {
  Vue.prototype.$api = apis
}
export default plugin
