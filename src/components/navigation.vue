<template>
    <div>
        <div class="xmy_pos"></div>
        <div class="navigation">
            <slot name="navigation_goback"></slot>
            <slot name="navigation_title"></slot>
            <slot name="navigation_small"></slot>
        </div>
    </div>
</template>

<style lang="less">
    .xmy_pos{
        width:100%;
        height:0.45rem;
    }
    .navigation{
        position: fixed;
        left: 0;
        top: 0;
        height:0.45rem;
        width:100%;
        line-height:0.45rem;
        background-color:#fff;
        border-bottom:1px solid #eee;
        z-index: 1000;
    }
</style>