<template>
    <div id="app">
        <div class="time"><button id='demo2' class="btn mui-btn mui-btn-block">{{queryDateText}}</button><img src="./images/arrow@2x.png"/></div>
        <div class="main" v-show="!noData">
            <div class="list" v-for="(item, index) in balanceDetail" :key="index">
                <img v-if="item.tradeTyep == 0" src="./images/icon2_chu1@2x.png"/>
                <img v-if="item.tradeTyep == 1" src="./images/icon2_ru@2x.png"/>
                <div class="left">
                    <div class="second">
                        <h2>{{item.tradeName}}</h2>
                        <p>{{item.tradeTime}}</p>
                    </div>                    
                    <div class="state chu" v-if="item.tradeTyep == 1">+{{item.tradeAmt}}</div>
                    <div class="state chu" v-if="item.tradeTyep == 0">-{{item.tradeAmt}}</div>
                </div>
            </div>
            <!-- <div class="list">
                <img src="./images/icon2_ru@2x.png"/>
                <div class="left">
                    <div class="second">
                        <h2>余额充值</h2>
                        <p>2018.06.21 13:14:25</p>
                    </div>
                    <div class="state ru">+1000.00</div>
                </div>
            </div> -->
        </div>
        <div class="isbottom" v-show="dataAll">别扯了，已经到底了...</div>
        <div class="none" v-show="noData">
            <img src="./images//icon_empty@2x.png"/>
            <p> 暂无明细呦!</p>
        </div>
    </div>
</template>
<script>
import '../../common/css/fineBalance.less';
import xmy from '../../../static/js/xmy.js';
export default {
    data () {
        return {
            noData: true,
            page:1,
            isWether: true,
            dataAll:false,
            queryDate:'',
            queryDateText:'',
            token: xmy.getQueryString('token'),
            userId: xmy.getQueryString('userId'),
            balanceDetail:[]
        }
    },
    methods: {
        getList () {
            let _this = this;
            console.log(_this.queryDate);
            $.ajax({
                url: '/gateway/api/account/getAccountLogList',
                type: 'post',
                data: {
                    token: _this.token,
                    userId: _this.userId,
                    userType: "B",
                    filterCond:'2',
                    page: _this.page,
                    pageSize:'13',
                    queryDate:_this.queryDate
                },
                success: function(res){
                    if(res.rspCode == "000000"){
                        if(Number(res.total) == 0){
                            _this.noData = true;
                        }else{
                            _this.noData = false;
                            _this.balanceDetail = _this.balanceDetail.concat(res.accTradeLog);
                        }
                        if(_this.page >= res.pages){
                            _this.dataAll = true;
                            _this.isWether =  false;
                        }else{
                            _this.dataAll = false;
                            _this.isWether =  true;
                        }

                    }else{
                        xmy.toast(res.rspMsg);
                    }
                }
            })
        }
    },
    mounted() {
        let _this = this;
        _this.queryDate = ((new Date().getFullYear())+''+(new Date().getMonth()+1));
        _this.queryDateText = new Date().getFullYear()+'年'+(new Date().getMonth()+1)+'月';
        _this.getList();
        (function ($) {
            $.init();
            var result = $('#demo2')[0];
            var btns = $('.btn');
            btns.each(function (i, btn) {
                btn.addEventListener('tap', function () {
                    //                    var optionsJson = this.getAttribute('data-options') || '{}';
                    var endYear=new Date().getFullYear();
                    var month=new Date().getMonth()+1;
                    var day = new Date().getDate();
                    var options = {"type":"month","endYear":endYear,"endMonth":month};
                    var id = this.getAttribute('id');
                    /*
                    * 首次显示时实例化组件
                    * 示例为了简洁，将 options 放在了按钮的 dom 上
                    * 也可以直接通过代码声明 optinos 用于实例化 DtPicker
                    */
                    var picker = new $.DtPicker(options);
                    picker.show(function (rs) {
                        /*
                        * rs.value 拼合后的 value
                        * rs.text 拼合后的 text
                        * rs.y 年，可以通过 rs.y.vaue 和 rs.y.text 获取值和文本
                        * rs.m 月，用法同年
                        * rs.d 日，用法同年
                        * rs.h 时，用法同年
                        * rs.i 分（minutes 的第二个字母），用法同年
                        */
                        _this.queryDate = rs.text.split("-").join("");
                        _this.queryDateText = rs.text.split("-")[0]+'年'+rs.text.split("-")[1]+'月'+rs.text.split("-")[2]+'日'
                        _this.getList();
                        /*
                        * 返回 false 可以阻止选择框的关闭
                        * return false;
                        */
                        /*
                        * 释放组件资源，释放后将将不能再操作组件
                        * 通常情况下，不需要示放组件，new DtPicker(options) 后，可以一直使用。
                        * 当前示例，因为内容较多，如不进行资原释放，在某些设备上会较慢。
                        * 所以每次用完便立即调用 dispose 进行释放，下次用时再创建新实例。
                        */
                        picker.dispose();
                    });
                }, false);
            });
        })(mui);
        window.onscroll = function(){

            let scrollTop = xmy.getScrollTop(),
                clientHeight = xmy.getClientHeight(),
                scrollHeight = xmy.getScrollHeight();
            if(scrollTop + clientHeight + 70 > scrollHeight) {
                if( _this.isWether){
                    _this.isWether =  false;
                    _this.page++;
                    _this.getList();
                }
            }
        };
    }
}
</script>
