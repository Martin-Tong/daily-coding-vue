<template>
    <section class="mt-carousel" :style="{'--index': currentCarouselIndex}">
        <div
            ref="carouselContainer"
            class="mt-carousel-container" 
            :style="{flexDirection: this.direction, width: carouselItemsTotalWidth}"
        >
            <slot></slot>
        </div>
        <ul v-if="this.controller" ref='controller' class="mt-carousel-controller">
            <li v-for = "item in items" :key = 'item' :class="[item == currentCarouselIndex? 'active' : '']" :data-index="item"></li>
        </ul>
        
    </section>
</template>

<script>
export default {
    name: 'Carousel',
    data() {
        return {
            carouselItemsTotalWidth: '',
            currentCarouselIndex: 1,
            carouselItems: 0,
            containerWidth: 0,
            containerWidthUnit: '',
            tweenGroup: null,
            tweenIns: null
        }
    },
    props: {
        controller: {
            type: Boolean,
            default: true
        },
        items: {
            type: Number,
            default: 0
        },
        direction : {
            type: String,
            default: 'row'
        }
    },
    mounted() {
        this.carouselItemsTotalWidth = this.getContainerWidth()
        this.carouselItemAnimaton()()
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
        carouselItemAnimaton(timestamp) {
            let original = {index: this.currentCarouselIndex - 1},
                carouselTween = new TWEEN.Group(),
                that = this
            let tweenIns = new TWEEN.Tween(original, carouselTween).to({index: "+1"}, 1500)
                .onUpdate(function() {
                    that.currentCarouselIndex = Math.round(original.index) + 1
                    that.$refs.carouselContainer.style.transform = 'translateX(' + (-original.index * that.containerWidth) + that.containerWidthUnit
                })
                .repeat(3)
                .yoyo()
                .repeatDelay(1000)
                .start(6000)
            this.$once("hook:beforeDestroy", ()=>{carouselTween = tweenIns = null})
            return function final() {
                window.requestAnimationFrame(final)
                carouselTween.update()
            }
        },

    }
}
</script>

<style>
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
</style>
