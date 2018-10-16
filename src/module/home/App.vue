<template>
    <div>
        <div class="body-mask"></div>
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide"><img src="./images/banner1.png"></div>
                <div class="swiper-slide"><img src="./images/banner2.png"></div>
                <div class="swiper-slide"><img src="./images/banner3.png"></div>
            </div>
            <!-- Add Pagination -->
            <div class="swiper-pagination"></div>
        </div>

        <!--
        <div class="home-list">
            <ul>
                <li>
                    <div class="list-block1">
                        <div class="block-box1">
                            <b>发传单</b><i>招30名</i>
                            <div class="block-list">
                                <span>上海</span>
                                <span>浦东新区</span>
                                <span>18~30岁</span>
                                <span>不限</span>
                            </div>
                        </div>
                        <span class="block-span">150元/天</span>
                    </div>
                    <div class="list-block2">
                        <div class="user-msg"><img src="../../../static/images/icon_bank_logo@2x.png">当天结账，包午餐</div>
                        <div class="user-level">
                            <span>要求：</span> 
                            <div class="level-star">
                                <div class="lev1"></div>
                            </div>
                        </div>
                    </div>
                </li>

                <li>
                    <div class="list-block1">
                        <div class="block-box1">
                            <b>发传单</b><i>招30名</i>
                            <div class="block-list">
                                <span>上海</span>
                                <span>浦东新区</span>
                                <span>18~30岁</span>
                                <span>不限</span>
                            </div>
                        </div>
                        <span class="block-span">150元/天</span>
                    </div>
                    <div class="list-block2">
                        <div class="user-msg"><img src="../../../static/images/icon_bank_logo@2x.png">当天结账，包午餐</div>
                        <div class="user-level">
                            <span>要求：</span> 
                            <div class="level-star">
                                <div class="lev4"></div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        -->

        <div class="online">
            <ul>
                <li>
                    <img src="./images/pic1@3x.png"/>
                    
                </li>
                <li>
                    <img src="./images/pic2@3x.png"/>
                    
                </li>
            </ul>
        </div>



        <div class="nav-foot">
            <a href="#" class="active"><i class="home"></i>首页</a>
            <a href="#"><i class="message"></i>消息<em>15</em></a>
            <a href="#"><i class="my"></i>我的</a>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {

            }   
        },

        mounted() {

            //首页banner幻灯
             var swiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                slidesPerView: 1,
                paginationClickable: true,
                spaceBetween: 0,
                loop: true,
                autoplay: 3000
            });
        }
    }
</script>

<style lang="less" scoped>
    @import '../../common/css/home.less';
</style>