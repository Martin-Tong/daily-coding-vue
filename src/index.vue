/* 主页 */
<template>
    <div id="view-root">
        <router-view />
        <router-view name="placeholder" />
    </div>
</template>

<script>
export default {

}
</script>

<style>
    #view-root {
        height: 100%;
        width: 100%;
    }
</style>>
