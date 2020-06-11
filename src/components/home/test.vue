/* @flow 
<template>
    <div id="nest1">
        <div id="nest2">nest2</div>
    </div>
</template>
*/

//<script>
const Test = () => import('../../../utils/customeEvent.js')
export default {
    mounted() {
        console.log(Test())
        let a =document.querySelector('#nest2')
        a.addEventListener('test',()=>{alert(1)})
        this.test()
    },
    methods: {
        test() {
            let a =document.querySelector('#nest2')
            Test().then((e) => e.default.create('test', {bubbles: true, cancelable: true, detail: 'test data'}).trigerEvent(a, 'test'))
        }
    }
}
//</script>