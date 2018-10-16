<template>
    <div id="app">
        <result refuse="false" message="很抱歉，你的额度以用完！">
            <a href="#" class="r-btn1" slot="btn-1">返回首页</a>
            <a href="#" class="r-btn2" slot="btn-2">更多借款</a>
        </result>
    </div>
</template>

<script>
    import '../../common/css/productDetail.less';
    import result from '../../components/result.vue';

    export default {

        components: {
            result
        },
     
        data (){
            return  {
                money: '500'
            }
        }
    }
</script>

