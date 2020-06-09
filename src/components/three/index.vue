<template>
    <div id="three">
        <div id='three-scene'>
        </div>
        <pre v-text="holder"></pre>
        <!--这里is用在普通的html标签上时test值绑定在 html.__vue__里，即此时VUE将这个普通html视为组件 -->
        <!-- <div id='oioi' :is="test"></div> -->
    </div>
</template>

<script>
import Factory from '../../../utils/threeFactory.js'
import * as THREE from 'three'
export default {
    name: 'Three',
    data() {
        return {
            holder: null,
            /* test: {
                name: 'Test',
                data() {
                    return {
                        a:1
                    }
                },
                render: (h) => {
                    return h('p', 'test')
                }
            } */
        }
    },
    mounted() {
        this.init()
        //this.$once('hook:beforeDestory',function(){this.threeIns = null})
    },
    methods: {
        init() {
            let segment = new Factory()
            segment.wh(window.innerWidth/1.5, window.innerHeight/1.5)
            segment.createCamera(75, 0.1, 1000)
            segment.createScene()
            segment.createRender()
            let threeContainer = document.querySelector('#three-scene')
            segment.render.setSize(window.innerWidth/1.5, window.innerHeight/1.5)
            segment.render.clear()
            segment.render.setPixelRatio( window.devicePixelRatio );
            let geometry = new THREE.BoxGeometry( 10, 10, 10, 20, 20, 2 );
            let material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
            let box = new THREE.Mesh( geometry, material );
            segment.objects = box
            //let helper = new THREE.FaceNormalsHelper( box, 2, 0x00ff00, 1 );
            segment.scene.background = COLORS.white
            segment.scene.add( box );
            segment.camera.position.z=50
            //this.threeIns.scene.add( helper );
            threeContainer.appendChild(segment.render.domElement)
            function animation(time) {
                window.requestAnimationFrame(animation)
                segment.segmentects.rotation.x = time*0.001*0.25
                segment.segmentects.rotation.y = time*0.001*0.5
                segment.render.render(segment.scene, segment.camera)
            }
            animation()
        }
    }
}
</script>

<style>
    #three {
        width: 100%;
        height: 100vh;
        overflow: hidden;
    }
    #three-scene {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    pre {
        width: 100%;
        height: 360px;
        background-color: gray;
        text-overflow: unset;
        word-break: break-all;
        white-space: pre-wrap;
        user-select: none;
    }
</style>