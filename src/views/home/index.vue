<template>
  <div class="home">
    <el-row :gutter="20">
      <el-col :span="8" style="margin-top: 10px">
        <el-card shadow="hover">
          <div slot="header" class="user">
            <img :src="userImg" alt="" />
            <div class="userInfo">
              <div class="name">Eason</div>
              <div class="access">超级管理员</div>
            </div>
          </div>
          <div
            v-for="(x, index) in cardContent"
            :key="index"
            class="login-info"
          >
            <p>
              {{ x.title + ":" }}<span>{{ x.content }}</span>
            </p>
          </div>
        </el-card>
        <el-card style="margin-top: 10px" :body-style="{ padding: '5px' }">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column
              v-for="(x, index) in labelData"
              :key="index"
              :prop="index"
              :label="x"
            >
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="16" style="margin-top: 10px">
        <div class="num">
          <el-card
            v-for="item in countData"
            :key="item.name"
            :body-style="{ display: 'flex', padding: 0 }"
          >
            <i
              class="icon"
              :class="`el-icon-${item.icon}`"
              :style="{ background: item.color }"
            ></i>
            <div class="detail">
              <p class="num">￥{{ item.value }}</p>
              <p class="text">￥{{ item.name }}</p>
            </div>
          </el-card>
        </div>
        <el-card style="height: 230px" :body-style="{ padding: 0 }">
          <line-chart :chartData="orderData" :height="'230px'"></line-chart>
        </el-card>
        <div class="graph">
          <el-card :body-style="{ padding: 0 }"
            ><bar-chart :chartData="userData" :height="'220px'"></bar-chart
          ></el-card>
          <el-card :body-style="{ padding: 0 }"
            ><pie-chart :chartData="videoData" :height="'220px'"></pie-chart
          ></el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import userImg from "../../assets/images/user.png";
import { getData } from "../../../api/data";
import BarChart from "../../components/BarChart.vue";
import LineChart from "../../components/LineChart.vue";
import PieChart from "../../components/PieChart.vue";
export default {
  components: { BarChart, LineChart, PieChart },
  name: "home",
  data() {
    return {
      userImg,
      cardContent: [
        {
          title: "上次登录时间",
          content: "2022-5-11",
        },
        {
          title: "上次登录地点",
          content: "广州",
        },
      ],
      tableData: [],
      labelData: {
        name: "课程",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买",
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
      orderData: {
        date: [],
        series: [],
        color: [],
      },
      userData: {
        date: [],
        newUser: [],
        activeUser: [],
        color: [],
      },
      videoData: {
        data: [],
        color: [],
      },
    };
  },
  mounted() {
    getData().then((res) => {
      const { code, data } = res.data;
      if (code === 20000) {
        this.tableData = data.tableData;
        //获取折线图数据
        const orderData = data.orderData;
        const keyArray = Object.keys(orderData.data[0]);
        const series = [];
        keyArray.forEach((key) => {
          series.push({
            name: key,
            type: "line",
            data: orderData.data.map((item) => item[key]),
            animationDuration: 2000,
          });
        });
        this.orderData.date = orderData.date;
        this.orderData.series = series;
        this.orderData.color = orderData.color;
        //获取柱状图数据
        this.userData.color = data.userData.color;
        const userData = data.userData.data;
        this.userData.date = userData.map((item) => item.date);
        this.userData.newUser = userData.map((item) => item.new);
        this.userData.activeUser = userData.map((item) => item.active);
        //获取饼状图数据
        this.videoData.data = data.videoData.data;
        this.videoData.color = data.videoData.color;
      }
    });
  },
};
</script>

<style lang="less" scoped>
@import url("../../assets/less/home.less");
</style>