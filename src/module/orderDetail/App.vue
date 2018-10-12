<template>
    <div>
        <div class="body-mask"></div>
        <div class="detail_header">
            <div class="xmy_nav">
                <a class="goback" href="javascript:histroy.go(-1);"></a>
                <span class="proname">订单详情</span>
            </div>

            <div class="order_header">
                <img class="head_img" src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=850016154,2966264409&fm=27&gp=0.jpg">
                <span class="head_name">芝麻借款</span>
                <span class="head_status">已拒绝</span>
            </div>
        </div>

        <div class="order_li">
            <div><span class="order_id">订单编号</span><span class="order_text">PL151185009670902300153306</span></div>
            <div><span class="order_id">创建时间</span><span class="order_text">2018.06.12  12:12:12 </span></div>
            <div><span class="order_id">薪资协议</span><a href="#">点击查看</a></div>
        </div>

        <div class="order_table">
            <table class="tab_1" colspan="0">
                <tr>
                    <th>本金</th>
                    <th>年利率</th>
                    <th>期限</th>
                    <th>用途</th>
                    <th>处理日</th>
                </tr>

                <tr>
                    <td>1000.00</td>
                    <td>12%</td>
                    <td>7天</td>
                    <td>教育</td>
                    <td>2018.06.12</td>
                </tr>
            </table>

            <div class="tab2_second">
                <table class="tab_1" colspan="0">
                    <tr>
                        <th>到期日</th>
                        <th>到期应还</th>
                        <th>违约金</th>
                        <th>罚息</th>
                        <th>逾期级别</th>
                    </tr>

                    <tr>
                        <td>1000.00</td>
                        <td>12%</td>
                        <td>7天</td>
                        <td>教育</td>
                        <td>2018.06.12</td>
                    </tr>
                </table>

                <table class="tab_1" colspan="0">
                    <tr>
                        <th>减免金额</th>
                        <th>当前应还</th>
                        <th>还款方式</th>
                        <th>实还金额</th>
                        <th>处理日</th>
                    </tr>

                    <tr>
                        <td>1000.00</td>
                        <td>12%</td>
                        <td>7天</td>
                        <td>教育</td>
                        <td>2018.06.12</td>
                    </tr>
                </table>
            </div>
        </div>

        <div class="order_foot">
            找TA聊聊
            <a href="#">
                <template v-if="1==1">立即还款</template>
                <template v-if="1==2">再借一笔</template>
            </a>
        </div>
    </div>
</template>

<script>
    export default {
       
    }
</script>

<style lang="less" scoped>
    @import '../../common/css/orderDetail.less';
</style>

