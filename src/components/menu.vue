<template>
    <div class="xmy_nav">
        <a href="javascript:;"></a>
        <slot name="title"></slot>
    </div>
</template>

<style lang="less">
    .xmy_nav{
        position: relative;
        height:0.45rem;
        background-color:#fff;
        a{
            position: absolute;
            left:0.1rem;
            top:0.13rem;
            display: block;
            width:0.16rem;
            height:0.16rem;
            background:url('../../static/images/leftarrow_1f.png') no-repeat;
            background-size: auto 0.16rem;
        }
    }
</style>