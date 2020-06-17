<template>
    <div id="echarts">
        <CustomUpload 
            :cOptions="{showLabel: true}" 
            @change="uploadFile"
            style="margin:5px 0; display:inline-block;"
        />
        <div id="echarts-container"></div>
    </div>
</template>

<script>
import Echarts from 'echarts'
export default {
    data() {
        return {
            echart : null
        }
    },
    mounted() {
        this.init()
        this.fetchData('/api/echarts-dataset-json').then((data) => {
            let a = JSON.parse(data)
            console.log(a)
            this.setOption(a.key)
        }).catch(e=>{console.log(e)})
    },
    methods: {
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
                    }
                },
                xAxis: [
                    {
                        type: 'value',
                        min: 0,
                        max: 11,
                        splitNumber: 10
                        
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
                        type: 'line',
                        name: 'line',
                        data: option,
                        smooth: true,
                        xAxisIndex: 0,
                        symbol: 'diamond'
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
