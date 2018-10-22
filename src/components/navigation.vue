<template>
    <div class="navigation">
        <slot name="navigation_goback"></slot>
        <slot name="navigation_title"></slot>
    </div>
</template>

<style lang="less">
    .navigation{
        position: relative;
        height:0.45rem;
        width:100%;
        line-height:0.45rem;
        background-color:#fff;
        border-bottom:1px solid #eee;
    }
</style>