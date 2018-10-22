<template>
    <div>
        <div class="body-mask"></div>

        
        <div class="home-list">
            <ul v-show="recruitList.length > 0">
                <li v-for="item in recruitList" @click="gozp(item.recruitId)" v-if="item.type == 'Recruit'">
                    <div class="list-block1">
                        <div class="block-box1">
                            <b>{{item.position}}</b><i>招{{item.peoples}}名</i>
                            <div class="block-list">
                                <span>{{item.workCity}}</span>
                                <span>{{item.workDistrict}}</span>
                                <span>{{item.minAge}}~{{item.maxAge}}岁</span>
                                <span>{{item.educationDesc}}</span>
                            </div>
                        </div>
                        <span class="block-span">{{item.minWages}}-{{item.maxWages}}{{item.wagesUnitDesc}}/{{item.wagesComputationTimeDesc}}</span>
                    </div>
                    <div class="list-block2">
                        <div class="user-msg"><img :src="item.userAvatar">{{item.employerDesc}}</div>
                        <div class="user-level">
                            <span>要求：</span> 
                            <div class="level-star">
                                <div v-if="item.starLevel ==1" class="lev1"></div>
                                <div v-if="item.starLevel ==2" class="lev2"></div>
                                <div v-if="item.starLevel ==3" class="lev3"></div>
                                <div v-if="item.starLevel ==4" class="lev4"></div>
                                <div v-if="item.starLevel ==5" class="lev5"></div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        
        <div class="online">
            <ul>
                <li v-for="item in recruitList" :data-id="item.productId" :data-uid="item.productUserId" v-if="item.type == 'Loan'" @click="golink(item.productId, item.productUserId, item.productName)">
                    <img :src="item.bannerUrl"/>
                </li>
            </ul>
        </div>

        <div class="repayment-ts">
            <span>待还金额: <b>1004.45元</b></span>
            <a href="javscript:;" @click="goOrder">立即还款</a>
        </div>
    </div>
</template>

<script>
    import xmy from '../../../static/js/xmy.js';
    export default {
        data () {
            return {
                recruitList: [],
                token: xmy.getQueryString('token'),
                userId: xmy.getQueryString('userId'),
                appVersion: xmy.getQueryString('appVersion'),
                device: xmy.getQueryString('device'),
                channelType: xmy.getQueryString('channelType')
            }   
        },

        methods: {
            recruit () {
                let _this = this;

                $.ajax({
                    url: '/gateway/api/user/jbj/recruit/list/page/v2',
                    type: 'POST',
                    data: {
                        token: _this.token,
                        userId: _this.userId,
                        curPage: 1,
                        pageSize: 10,
                        appId: 'xiaomuyu',
                        channelType: _this.channelType,
                        appVersion: _this.appVersion,
                        device: _this.device
                    },
                    success: function(res){
                        if(res.respCode == '000000'){
                            _this.recruitList = res.data;
                        }
                    }
                });
            },

            gozp (recruitId) {
                window.location.href = '/api/static/app_xmy/zpdetail?recruitId='+recruitId;
            },

            golink (productId,productUserId,productName) {
                xmy.setCookie('productName',productName);
                let _this = this;
                $.ajax({
                    url: '/gateway/api/user/product/checkAuth',
                    type: 'POST',
                    data: {
                        token: _this.token,
                        userId: _this.userId,
                        productId: productId
                    },
                    success: function(res){
                        if(res.respCode == '000000'){
                            if(res.data.status == 'Y'){
                                var link = '/api/static/xmy/module/init.html?token='+_this.token+'&userId='+_this.userId+'&productId='+productId + '&productUserId='+ productUserId;
                                window.location.href = link;
                                
                            } else if(res.data.status == 'N'){
                                window.location.href = '/api/static/xmy/app_xmy/renzhen?productId='+productId;
                            }
                        }
                    }
                });
            },

            goOrder () {
                window.location.href = '/api/static/xmy/module/order.html?token='+  this.token + '&userId='+this.userId;
            }
        },

        mounted() {
            this.recruit();
        }
    }
</script>

<style lang="less" scoped>
    @import '../../common/css/home.less';
</style>