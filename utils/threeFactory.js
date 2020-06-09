// @flow
import * as THREE from 'three'
import dispatchEvents from './eventDispatch.js'

export default function Factory() {
    this.camera = null,
    this.render = null,
    this.light = null,
    this.scene = null,
    this.objects = []
}
Factory.prototype = Object.assign({}, dispatchEvents)
Factory.prototype.constructor = Factory
Factory.prototype.wh = function(w, h) {
    this.__width = w
    this.__height = h
}
Factory.prototype.createCamera = function(fov, near, fast, kind='PerspectiveCamera') {
    if (this.__height && this.__width) {
        this.camera = new THREE[kind](fov, this.__width / this.__height, near, fast)
    } else {
        this.camera = new THREE[kind](fov, window.innerWidth / window.innerHeight, near, fast)
    } 
}
Factory.prototype.createRender = function(target, kind='WebGLRenderer') {
    if (target) {
        this.render = new THREE[kind](target)
    } else {
        this.render = new THREE[kind]()
    }
}
Factory.prototype.createScene = function() {
    this.scene = new THREE.Scene()
}
