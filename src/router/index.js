import VueRouter from 'vue-router'
const APP = () => import(/* webpackPreload: true */ '@/components/home/index.vue')
const Three = () => import(/* webpackPrefetch: true */ '@/components/three/index.vue') //这里动态导入已经进行代码分割了
const Echarts = () => import(/* webpackPreload: true */ '@/components/echarts/index.vue')
//import Three from '@/components/three/index.vue' //要使用splitwebpackplugin的话必须使用这非动态的导入方式
export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: APP
        },
        {
            path: '/three',
            component: Three
        },
        {
            path: 'echarts',
            component: Echarts
        }
    ]
})