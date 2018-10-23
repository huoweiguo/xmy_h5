<template>
    <div>
        <div class="body-mask"></div>
        
        <div class="home-list">
            <div class="home-tj">推荐</div>

            <ul v-show="recruitList.length > 0">
                <li v-for="item in recruitList" @click="gozp(item.recruitId,item.userId,item.employerDesc,item.yunxinId)" v-if="item.type == 'Recruit'">
                    <div class="li-content">
                        <div class="block-headImg"><img :src="item.userAvatar"></div>
                        <div class="list-block1">
                            <div class="block-box1">
                                <b>{{item.position}}({{item.peoples}}名)</b>
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
                            <div class="user-msg">{{item.employerDesc}}</div>
                            <div class="user-level">
                                <span>要求&nbsp;</span> 
                                <div class="level-star">
                                    <div v-if="item.starLevel ==1" class="lev1"></div>
                                    <div v-if="item.starLevel ==2" class="lev2"></div>
                                    <div v-if="item.starLevel ==3" class="lev3"></div>
                                    <div v-if="item.starLevel ==4" class="lev4"></div>
                                    <div v-if="item.starLevel ==5" class="lev5"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        
        <div class="online">
            <ul>
                <li v-for="item in recruitList" :data-id="item.productId"  :data-uid="item.productUserId" v-if="item.type == 'Loan'" @click="golink(item.productId, item.productUserId, item.productName)">
                    <img :src="item.bannerUrl"/>
                </li>
            </ul>
        </div>

        <div class="plat_small">本平台不向22周岁以下学生提供服务</div>


        <!--
        <div class="repayment-ts" v-show="loan">
            <span>待还金额: <b>{{charge}}元</b></span>
            <a href="javascript:;" @click="goOrder">立即还款</a>
        </div>-->
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
                channelType: xmy.getQueryString('channelType'),
                loan: false,
                charge: '',
                repay: 'N'
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


            gozp (recruitId,uid,employerDesc,yunxinId) {
                window.location.href = '/api/static/app_xmy/zpdetail?recruitId='+recruitId+'&employerDesc='+employerDesc+'&userId='+uid+'&yunxinId='+yunxinId;
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
                                var link = '/api/static/xmy/module/init.html?token='+_this.token+'&userId='+_this.userId+'&productId='+productId + '&productUserId='+ productUserId+'&repay='+_this.repay;
                                window.location.href = link;
                                
                            } else if(res.data.status == 'N'){
                                window.location.href = '/api/static/xmy/app_xmy/renzhen?productId='+productId+'&productUserId='+productUserId;
                            }
                        }
                    }
                });
            },

            goOrder () {
                window.location.href = '/api/static/xmy/module/order.html?token='+  this.token + '&userId='+this.userId+'&gotoType=home';
            },

            render_loan () {
                var _this = this;
                $.ajax({
                    url: '/gateway/api/order/billOrder/queryOverduePopTip',
                    type: 'POST',
                    data: {
                        userId : _this.userId,
                        token: _this.token,
                        userType: 'B'
                    },
                    success: function(res){
                        if(res.respCode == '000000'){
                            if(res.data.isPopRepayTip == 'Y' || res.data.isPopWithdrawTip == 'Y'){
                                _this.charge = res.data.repaymentAmt;
                                _this.repay = "Y";
                            }
                        }
                    }
                });
            }
        },

        mounted() {
            this.recruit();
            this.render_loan();
        }
    }
</script>

<style lang="less" scoped>
    @import '../../common/css/home.less';
</style>