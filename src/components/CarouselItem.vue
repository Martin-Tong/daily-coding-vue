<template>
    <div class="mt-carousel-items">
        <img :src="this.src" :alt="this.alt" :title="this.alt" class="f2">
    </div>
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

<style>
    .mt-carousel-items {
        flex: 1;
    }
    .mt-carousel-items img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
</style>>