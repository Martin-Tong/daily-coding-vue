<template>
    <div id="mt-upload" :style="{'--view-width': inputButtonHeight + 'px'}">
        <div id='mt-upload-container' :style="{'flex-direction': this.options.labelPosition}">
            <div id="mt-upload-label" v-show="this.options.showLabel">
                <label  for="mt-upload-input">{{this.options.labelText}}</label>
            </div>
            <div id="mt-upload-input">
                <input type="file" v-on="$listeners"/>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CustomUpload',
    data() {
        return {
            inputButtonHeight: ''
        }
    },
    computed: {
        options() {
            return Object.assign({
                    showLabel: true,
                    labelText: '请选择上传的文件',
                    labelPosition: 'column'
                }, this.cOptions)
        }
    },
    mounted() {
        let inputButton = document.querySelector('#mt-upload-input')
        this.inputButtonHeight = this.calcWidth(inputButton)
    },
    props:{
        cOptions: {
            type: Object,
            default: function() {
                return {
                    showLabel: true,
                    labelText: '请选择上传的文件',
                    labelPosition: 'column'
                }
            }
        }
    },
    methods: {
        calcWidth(ele) {
            let rects = ele.getClientRects()
            let a = rects[0].height,
                b = rects[0].width
            if (a > b) {
                return b
            } else if (b > a) {
                return a
            }
            return a
        }
    }
}
</script>

<style scoped>
    #mt-upload {
        width: 12em;
        height: 12em;
    }
    #mt-upload-container {
        display: flex;       
        overflow: hidden;
        height: 100%;
        width: 100%;
    }
    #mt-upload-label {
        flex: 1;
        font-family: cursive;
        display: flex;
        align-items: center;
    }
    #mt-upload-input {
        flex: 2;
    }
    #mt-upload-input input{
        width: var(--view-width);
        height: var(--view-width);
        position: relative;
        flex: 2;
        outline: none;
        border-radius: 5%;
        overflow: hidden;
        cursor: pointer;
    }
    #mt-upload-input input::after {
        content: '+';
        background-color: gray;
        line-height: var(--view-width);
        width: var(--view-width);
        font-size: calc(var(--view-width) / 3);
        text-align: center;
        position: absolute;
        left: 0;
        top: 0;
    }
</style>