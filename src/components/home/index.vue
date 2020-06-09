<template>
    <div>
        <h1>test</h1>
        <Carousel :items="5" style="width:1680px;height:420px;margin: 0 auto">
            <CarouselItem v-for="i in 5" :key="i" src="https://30erli.cn/static/img/timg.0eaf803.jpg" :data-index="i" />
        </Carousel>
        <Test />
    </div>
</template>

<script>
/* const Carousel = () => import('@/components/Carousel.vue')
const CarouselItem = () => import('@/components/CarouselItem.vue') */
import Test from '@/components/home/test.vue'
export default {
    /* components: {Carousel, CarouselItem} */
    components: {Test}
}
</script>

<style scoped>
    h1 {
        text-align: center;
    }

</style>