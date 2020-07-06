<template>
    <div id="echarts">
        <div>
            <CustomUpload 
                :cOptions="{showLabel: true}" 
                @change="uploadFile"
                style="margin:5px 0; display:inline-block;"
            />
            <div id="echarts-container"></div>
        </div>
        <SideWidge />
        <button @click="reIndex">reIndex</button>
        <transition-group tag="ul" name="test">
            <li v-for="item in test" :key="item">{{item}}</li>
        </transition-group>
        <!-- 模态框 -->
        <Modal @toggled="modalToggled" ref="modal" :beforeShow="this.popp">
            <iframe 
                referrerpolicy="unsafe-url" 
                sandbox=""
                ref="ifr" 
                seamless  
                allow="payment" 
                src=""
                style="object-fit:cover"
                scrollig='no'
                >你的浏览器不支持内嵌框架</iframe>
        </Modal>
        <!-- 模态框end -->
        <button @click="toggleModal">{{buttonText}}</button>
        <test-a v-if="show" />
    </div>
     
</template>

<script>
import Echarts from 'echarts'
export default {
    comments: true,
    data() {
        return {
            show: '',
            test: [1,2,3,5,4]
        }
    },
    computed: {
        buttonText() {
            return this.show?"关闭":"打开"
        }
    },
    components: {
        "test-a": () => {
            return {
            loading: '<CustomUpload />',
            component: import('@/components/home/index.vue'),
            delay: 10000
        }
        }
    },
    mounted() {
        let that = this
        this.init()
        this.fetchData('/api/echarts-dataset-json').then((data) => {
            let a = JSON.parse(data)
            console.log(that)
            this.setOption(a.key)
        }).catch(e=>{console.log(e)})
        this.$options.ooook='dsd'
        console.log(__webpack_modules__)
    },
    methods: {
        reIndex() {
            let a = this.test.slice(),
                b = a.length,
                c = []
            for (let i =0 ; i< b ;i++) {
                let d = Math.floor(Math.random()*(b-i))
                c[i] = a[d]
                a.splice(d,1)
            }
            this.test = c
            console.log($)
            /* this.test = [4,5,8,6,3,1] */
        },
        popp() {
            this.fetchData('/api/echarts-dataset-json').then((data) => {
            let a = JSON.parse(data)
            this.setOption(a.key)
            }).catch(e=>{console.log(e)})
            this.$refs.ifr.src='http://127.0.0.1:5000/auth/login'
        },
        init() {
            let a = document.querySelector('#echarts-container')
            this.echart = Echarts.init(a, null, {
                width: '960px',
                height: '480px'
            })
            console.log(this.echart)
            this.$once("hook:beforeDestroy", ()=>{this.echart = null})
        },
        setOption(option) {
            let originOption = {
                backgroundColor: 'transparent',
                title: {
                    id: "1",
                    show: true,
                    text: 'custome title',
                    textVerticalAlign: 'top'
                },
                /* grid: {}, */
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    },
                    formatter: "{a}${b}${c}"
                },
                xAxis: [
                    {
                        type: 'value',
                        min: 0,
                        max: 11,
                        splitNumber: 10,
                        axisPointer: {
                            type: 'shadow',
                            triggerTooltip: false
                        }
                    }/* ,
                    {
                        name: 'xAxis2',
                        data: ['1','2','3','4','5'],
                        nameLocation: 'middle',
                        nameGap: 30
                    } */
                ],
                legend: {},
                yAxis: {},
                series: [
                    {
                        type: 'scatter',
                        name: 'lineEX',
                        data: option,
                        label: {
                            show: true,
                            formatter: '{a}-{b}-{@[2]}'
                        },
                        xAxisIndex: 0,
                        symbol: 'circle',
                        dimension: ['first', 'second', 'third']
                    }
                ]
            }
            this.echart.setOption(originOption)
        },
        fetchData(rUrl) {
            let xhr = new XMLHttpRequest()
            return new Promise((resolve, reject) => {
                xhr.open('get',rUrl, true)
                xhr.onload=function(){
                    resolve(xhr.response)
                }
                xhr.onerror=function() {
                    reject('error')
                }              
                xhr.send(null)
            })           
        },
        uploadFile(e) {
            let fileReader = new FileReader(),
                target = e.target.files[0]
            console.log(target)
            fileReader.readAsBinaryString(target)
            fileReader.onloadend = function() {
                console.log(fileReader.result)
            }
            fileReader.readAsText(target)
            fileReader.onload = () =>{
                console.log(this)
                this.setOption(JSON.parse(fileReader.result).key)
            }          
        },
        modalToggled(e) {
            console.log(e)
            this.show = e
        },
        toggleModal() {
            if (this.show) {
                this.$refs.modal.close()
            } else {
                this.$refs.modal.show()
            }
        }
    }
}
</script>

<style>
    #echarts {
        --ui: 35;
        width: 100%;
        height: 100%;      
    }
    #echarts-container {
        width: 50%;
    }
    .test-move {
        transition: transform 0.5s;
    }
</style>
