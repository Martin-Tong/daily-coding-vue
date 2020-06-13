import Vuex from 'vuex'
import Vue from 'vue'
import {WEBGL} from 'three/examples/jsm/WebGL.js'

let webglSupported
if (WEBGL.isWebGLAvailable) {
    webglSupported = true
} else {
    webglSupported = WEBGL.getWebGLErrorMessage()
}

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        VERSION: 'V1.0',
        isWebGLAvailable: webglSupported
    }
})