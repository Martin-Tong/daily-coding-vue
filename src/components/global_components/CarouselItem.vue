<template>
    <a class="mt-carousel-items" href="javascript:void(0)">
        <img :src="this.src" :alt="this.alt" :title="this.alt">
    </a>
</template>

<script>
export default {
    name: 'CarouselItem',
    props: {
        src: String,
        alt: {
            type: String,
            default: 'null'
        }
    }
}
</script>

<style scoped>
    .mt-carousel-items {
        flex: 1;
    }
    .mt-carousel-items img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
</style>>