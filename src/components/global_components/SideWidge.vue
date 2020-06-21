<template>
    <div class="mt-aside">
        <aside>
            <p>aside</p>
            <slot></slot>
        </aside>
        <div class="mt-aside-control" @click="toggle">
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SideWidge',
    data() {
        return {
            width: 0,
            closed: true
        }
    },
    mounted() {
        this.width = this.$el.getClientRects()[0].width
    },
    methods: {
        toggle() {
            let a,
                that = this
            if (this.width == 0 && this.closed) {
                a = new TWEEN.Tween({width: this.width}).to({width: 250}, 500)
            } else if (this.width == 250 && !this.closed) {
                a = new TWEEN.Tween({width: this.width}).to({width: 0}, 500)
            } else {
                return
            }
            a.onUpdate(function(e){
                that.width = e.width
                document.body.style.paddingRight = e.width + 'px'
                that.$el.style.width = e.width + 'px'
            }).onComplete(function(){             
                that.closed = !that.closed
            }).start()
            function animation() {
                if (TWEEN.update()) {
                    window.requestAnimationFrame(animation)
                }
            }
            animation()
        }
    }
}
</script>

<style scoped>
   .mt-aside {
       height: 100%;
       position: fixed;
       top: 0;
       right: 0;
       width: 0;
       background-color: whitesmoke;
       box-sizing: border-box;
   }
   .mt-aside-control {
       position: fixed;
       bottom: 50px;
       right: 50px;
       width: 36px;
       height: 36px;
       cursor: pointer;
       background-color: black;
       color: white;
       display: flex;
       flex-direction: column;
   }
   .mt-aside-control span {
       display: block;
       width: 100%;
       flex: 1;
       border: 1px solid white;
   }

</style>