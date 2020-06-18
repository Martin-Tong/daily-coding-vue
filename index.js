// @flow
import Vue from 'vue/dist/vue.esm.js'
import APP from '@/index.vue'
import '@/index.css'
import Router from 'vue-router'
import Vuex from 'vuex'
import router from '@/router/index.js'
import store from '@/store/index.js'

/* import  cv, {createTweenIns, createAnimation} from './utils/tweenAnimation.js' 
let a =createTweenIns({x:1}, {x:10}, 0,1000,true), b = createTweenIns({y:1}, {y:10}, 0,1000,true)
TWEEN.update()
createAnimation(a)()
createAnimation(b)()
 */
Vue.config.errorHandler = function(err, vm, info) {
    window.console.log(
        `%c errorCaptured: <${err}> \n error from hook: ${info}`, "color: white;background-color: orange")
    console.log(vm)
}

/* eslint-disable */
// $FlowFixMe
const baseComponents = require.context('./src/components/global_components', false, /\.vue$/, 'lazy')
baseComponents.keys().forEach(filename => {
    baseComponents(/* webpackChunkName: "mt-components" */ filename).then(o => {
        Vue.component(o.default.name, o.default || o)
    })
/*     const componentName = filename.split('/')[1].split('.')[0]
    Vue.component(componentName, component.default || component) */
})
/* eslint-disable */

Vue.use(Router)
Vue.use(Vuex)

new Vue({
    el: "#entry",
    router,
    store,
    render: (h) => h(APP)
})

/* {var frames = 0, fps
var start = performance.now()
function fpsDetec(time){
    let timeGap = (time-start)/1000
    frames++
    if (timeGap > 1) {
        fps = Math.floor(frames/timeGap)
        console.log(fps)
    }
    window.requestAnimationFrame(fpsDetec)
}
window.requestAnimationFrame(fpsDetec)} */