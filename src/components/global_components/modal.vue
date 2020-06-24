<template>
    <dialog class="mt-modal">
        <span class="mt-modal-close" @click="this.close">&times;</span>
        <!-- <form method="dialog">
            <p><label for="favAnimal">Favorite animal:</label>
        <select id="favAnimal" name="favAnimal">
          <option disabled selected>请选择</option>
          <option>Brine shrimp</option>
          <option>Red panda</option>
          <option>Spider monkey</option>
        </select></p>
            <button type="submit">提交</button>
        </form> -->
        <slot></slot>
    </dialog>
</template>

<script>
export default {
    name: "Modal",
    data() {
        return {
            isShown: ''
        }
    },
    props: {
        beforeShow: {
            type: Function,
            default: undefined
        },
        beforeClose: {
            type: Function,
            default: undefined
        }
    },
    mounted() {
        this.isShown = this.$el.open
    },
    watch: {
        isShown(newV) {
            this.$emit('toggled', newV)
        }
    },
    methods: {
       show() {
           let a = this.beforeShow,
                that = this
           if (a && typeof(a) == 'function') {
               let promise = new Promise((resolve, reject) => {
                   try {
                       that.beforeShow()
                        resolve(true)
                   } catch (err) {
                       reject(err)
                   }                  
               })
               promise.then(() => {this.$el.showModal()})              
           } else {
               this.$el.showModal()
           }      
           this.isShown = true
       },
       close() {
           this.$el.close()
           this.isShown = false
       }
    }
}
</script>

<style scoped>
    .mt-modal {
        width: 50%;
        height: 50%;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border: none;
        box-shadow: 0px 2px 8px grey, 2px 4px 12px lightgrey;
        transition: all 0.5s ease;
    }
    .mt-modal-close {
        position: absolute;
        width: 36px;
        height: 36px;
        background-color: lightseagreen;
        top: 18px;
        right: 18px;
        cursor: pointer;
        line-height: 36px;
        text-align: center;
    }
    dialog.mt-modal::backdrop {
        user-select: none;
        background-color: rgba(100,110,110,0.5);
        transition: all 0.5s ease;
    }
</style>