<template>
    <section class="mt-carousel" :style="{'--index': currentCarouselIndex,'--width': containerWidth + containerWidthUnit}">
        <div
            ref="carouselContainer"
            class="mt-carousel-container" 
            :style="{flexDirection: this.direction, width: carouselItemsTotalWidth}"
        >
            <slot></slot>
        </div>
        <ul v-if="this.controller" ref='controller' class="mt-carousel-controller">
            <li 
                v-for = "item in carouselItems" 
                :key = 'item' 
                :class="[item == currentCarouselIndex? 'active' : '']" :data-index="item"
                @click = "handleClick(item)"
            ></li>
        </ul>
        <div v-show="this.sideController" class="side-controler left"><i class="fas fa-chevron-left fa-xs"></i></div>
        <div v-show="this.sideController" class="side-controler right"><i class="fas fa-chevron-right fa-xs"></i></div>
    </section>
</template>

<script>
export default {
    name: 'Carousel',
    data() {
        return {
            carouselItemsTotalWidth: '', //所有轮播内容的总宽度
            currentCarouselIndex: 1, //当前播放的内容的索引
            carouselItems: 0, //轮播内容的条目数
            containerWidth: 0, //轮播图容器的宽度
            containerWidthUnit: '', //轮播图容器的宽度单位
            tweenGroup: null, //tween Group对象
            tweenIns: null //tween实例或者css动画时的动画函数
        }
    },
    props: {
        controller: {
            type: Boolean,
            default: true
        },
        animationTypes: {
            type: String,
            default: 'css',
            validator: function(value) {
                return ['javascript', 'css'].indexOf(value) !== -1
            }
        },
        direction : {
            type: String,
            default: 'row'
        },
        autoPlay: {
            type: Boolean,
            default: true
        },
        sideController: {
            type: Boolean,
            default: true
        }
    },
    mounted() {
        //布局必须，取得轮播图容器大小以计算轮播图总宽度
        this.carouselItemsTotalWidth = this.getContainerWidth()
        //根据是否需要自动播放及播放使用的方法确定
        if (this.autoPlay) {
            if (this.animationTypes === "javascript") {
                this.carouselItemAnimaton()()
            } else {
                this.carouselCssAnimationControl()
            }
        }
        //点击切换轮播图当前展示的内容

        this.$once("hook:beforeDestroy", ()=>{this.$data = null})
    },
    methods: {
        getContainerWidth() {
            const containerElm = this.$el
            let carouselItems = this.carouselItems = this.$slots.default ? this.$slots.default.length : 1,
                containerWidth = containerElm.style.width,
                containerWidthUnit = this.containerWidthUnit = /^(\d+)(.+)$/.exec(containerWidth)[2]
            this.containerWidth = parseInt(containerElm.style.width)
            return carouselItems * parseInt(containerWidth) + containerWidthUnit
        },
        //使用tween.js实现动画
        carouselItemAnimaton() {
            let original = {index: this.currentCarouselIndex - 1},
                that = this
            this.tweenGroup = new TWEEN.Group()
            this.tweenIns = new TWEEN.Tween(original, this.tweenGroup).to({index: "+1"}, 1500)
                .onUpdate(function() {
                    that.currentCarouselIndex = Math.round(original.index) + 1
                    that.$refs.carouselContainer.style.transform = 
                        'translateX(' + (-original.index * that.containerWidth) + that.containerWidthUnit + ')'
                })
                .repeat(this.carouselItems - 2)
                .yoyo()
                .repeatDelay(1000)
                .start(6000)
            return function final() {
                window.requestAnimationFrame(final)
                that.tweenGroup.update()
            }
        },
        //使用css变量实现动画
        carouselCssAnimationControl() {
            let that = this,
                origin,
                animation = {}
            animation.key = null
            animation.stop = function() {
                clearInterval(this.key)
            }
            animation.start = function() {
                origin = that.$el.style.getPropertyValue('--index'),
                this.key = setInterval(function(){
                    if (origin <= that.carouselItems) {
                        that.currentCarouselIndex = origin
                        that.$el.style.setProperty('--index', ++origin)
                    } else {
                        origin = 1
                    }      
                }, 1800)
            }
            this.tweenIns = animation
            this.$refs.carouselContainer.classList.add('mt-carousel-container-css-animation')
            animation.start()
            this.$once("hook:beforeDestroy", () => {
                clearInterval(animation.key)
                this.tweenIns = null
            })           
        },
        //移动轮播图工具函数
        moveTo(index) {
            return -this.containerWidth * (index -1) + this.containerWidthUnit
        },
        //下方导航条点击切换函数
        //TODO：实现js动画下的切换功能
        handleClick(item) {
            let that = this
            this.tweenIns.stop()
            this.currentCarouselIndex = item
            let a = this.$refs.carouselContainer.style
            a.transition="transform 0.5s ease"
            this.$el.style.setProperty('--index', item)
            setTimeout(() => {that.tweenIns.start()}, 1200)
        }
    }
}
</script>

<style scoped>
.mt-carousel {
    overflow: hidden;
    position: relative;
}
.mt-carousel-container {
    display: flex;
    height: 100%;
    position: absolute;
    left: 0;
}
.mt-carousel-container-css-animation {
    --offset: calc((var(--index) - 1) * -1 * var(--width) );
    transform: translateX(var(--offset));
    transition: transform 1s ease;
}
.mt-carousel-controller {
    display: inline-block;
    width: 50%;
    height: 10px;
    left: 50%;
    align-items: center;
    transform: translateX(-50%);
    position: absolute;
    list-style: none;
    display: flex;
    flex-direction: row;
    bottom: 0px;
}
/* .mt-carousel-controller::after {
    content: '';
    width: 16%;
    height: 5px;
    margin: 0 15px;
    background-color: red;
    z-index: 9999;
    position: absolute;
    border-radius: 5px;
} */
.mt-carousel-controller li {
    /* flex: 1; */
    margin: 0 15px;
    background-color: white;
    height: 5px;
    border-radius: 5px;
    cursor: pointer;
    transform: translateZ(0);
    width: 16%;
}
.mt-carousel-controller li.active::after {
    content: '';
    /* width: 100%; */
    height: 5px;
    background-color: orange;
    z-index: 9999;
    position: absolute;
    border-radius: 5px;
    animation-name: lol;
    animation-duration: 1s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
}
@keyframes lol {
    from {
        width: 0;
        transform: translateX(50%);
    }
    to {
        width: 100%;
        transform: translateX(0);
    }
}
.side-controler {
    display: block;
    height: calc(var(--width) * 0.05);
    width: calc(var(--width) * 0.05);
    position: absolute;
    border-radius: 50%;
    background-color: white;
    top: 50%;
    transform: translateY(-50%);
    opacity: 0.2;
    cursor: pointer;
    transition: all 0.5s ease;
    display: flex;
    justify-content: center;
    align-items: center;
}
/* .side-controler.left::after {
    content: '';
    box-sizing: border-box;
    display: inline-block;
    position: absolute;
    top: 50%;
    left: 50%;
    height: 25px;
    width: 25px;
    transform: translate(-50%, -50%);
    border: 25px solid transparent;
    border-right-color: red;
} */
.side-controler.left:hover {
    left: 0;
    opacity: 0.9;
} 
.side-controler.right:hover {
    right: 0;
    opacity: 0.9;
}
.left {
    left: calc(var(--width) * -0.05 / 2);
}
.right {
    right: calc(var(--width) * -0.05 / 2);
}
</style>
