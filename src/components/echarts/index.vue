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
    </div>
</template>

<script>
import Echarts from 'echarts'
export default {
    comments: true,
    data() {
        return {
            show: ''
        }
    },
    computed: {
        buttonText() {
            return this.show?"关闭":"打开"
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
    },
    methods: {
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
        width: 100%;
        height: 100%;      
    }
    #echarts-container {
        width: 50%;
    }
</style>
