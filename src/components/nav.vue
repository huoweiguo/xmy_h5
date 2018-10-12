<template>
    <div class="xmy_nav">
        <a class="goback" href="javascript:histroy.go(-1);"></a>
        <span class="proname" v-text="title"></span>
        <slot name="detail"></slot>
    </div>
</template>

<style lang="less" scoped>
    .xmy_nav{
        position: relative;
        margin:0 auto;
        height: 0.45rem;
        align-items: center;
        z-index: 1;
        background-color:#fff;
        border-bottom:1px solid #eee;
        a.goback{
            position:absolute;
            left:0.1rem;
            top: 0.13rem;
            display:block;
            width: 0.16rem;
            height: 0.16rem;
            background:url(../../static/images/leftarrow_1f.png) no-repeat;
            background-size: contain;
            z-index:2;
        }
        .proname{
            position: absolute;
            left: 0;
            top: 0;
            display:block;
            width: 100%;
            height:0.45rem;
            line-height:0.45rem;
            text-align: center;
            z-index: 0;
            font-size:0.18rem;
        }
    }
</style>

<script>
    export default {
        props: ['title']
    }
</script>