/* @flow
<template>
    <div id="echarts">
        <CustomUpload 
            :cOptions="{showLabel: true}" 
            @change="uploadFile"
            style="margin:5px 0; display:inline-block"
        />
        <div id="echarts-container"></div>
    </div>
</template>
*/

//<script>
import Echarts from 'echarts'
export default {
    data() {
        return {
            echart: null
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
                width: 'auto',
                height: 'auto'
            })
            this.$once("hook:beforeDestroy", ()=>{a = null})
        },
        setOption(option) {
            let originOption = {
                backgroundColor: 'black',
                xAxis: [
                    {
                        data: ['1','2','3','4','5']
                    }
                ],
                yAxis: {},
                series: [
                    {
                        type: 'bar',
                        data: option
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
                target = e.target
            console.log(e)
            fileReader.readAsDataURL(target.files[0])
            fileReader.onload = () =>{
                console.log(fileReader.result)
            }
            
        }
    }
}
//</script>

/*
<style>
    #echarts {
        width: 100%;
        height: 100%
    }
    input[type="file"]#echarts-dataset-upload {
        display: inline-block;
        height: 8em;
        width: 8em;
        opacity: 0; 
    }
    #echarts-container {
        height: 80%;
        width: 50%;
    }
</style>
*/