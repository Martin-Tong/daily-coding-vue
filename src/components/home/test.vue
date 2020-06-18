<template>
    <div id="nest1">
        <div id="nest2">nest2</div>
        <i class="fas fa-chevron-left"></i>
    </div>
</template>

<script>
const Test = () => import('../../../utils/customeEvent.js')
export default {
    mounted() {
        let a =document.querySelector('#nest2')
        a.addEventListener('test',()=>{console.log('test event triggerd')})
        this.test()
    },
    methods: {
        test() {
            let a =document.querySelector('#nest2')
            Test().then((e) => e.default.create('test', {bubbles: true, cancelable: true, detail: 'test data'}).trigerEvent(a, 'test'))
        }
    }
}
</script>