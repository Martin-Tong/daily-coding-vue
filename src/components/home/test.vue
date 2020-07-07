<template>
    <div id="nest1">
        <div id="nest2" @click="click">nest2</div>
        <!-- <i class="fas fa-chevron-left"></i> -->
		<slot name="slot1" :slot1="a">slot1</slot><br />
		<slot name="slot2" :slot2='b'>slot2</slot>
    </div>
</template>

<script>
const Test = () => import('../../../utils/customeEvent.js')
export default {
	data() {
		return {
			a: [1,2,3,4,5,6],
			b: ['a','b','c','d']
		}
	},
    mounted() {
        let a =document.querySelector('#nest2')
        a.addEventListener('test',()=>{console.log('test event triggerd')})
        this.test()
    },
    methods: {
        test() {
            let a =document.querySelector('#nest2')
            Test().then((e) => e.default.create('test', {bubbles: true, cancelable: true, detail: 'test data'}).trigerEvent(a, 'test'))
		},
		click() {
			this.a = this.a.reverse()
			this.b = this.b.reverse()
		}
    }
}
</script>
