<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
// 按需引入 引入 ECharts 主模块
import * as echarts from "echarts/lib/echarts";
// 引入饼状图
import "echarts/lib/chart/pie";
// 引入提示框组件
import "echarts/lib/component/tooltip";
import "echarts/lib/component/legend";
import "echarts/lib/component/grid";
//解决窗口缩放自适应
import chartResize from "./mixins/chart-resize";

export default {
  mixins: [chartResize],
  props: {
    className: {
      type: String,
      default: "chart",
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "350px",
    },
    // 父组件传递过来的图表数据
    chartData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      // Echarts实例
      chart: null,
    };
  },
  watch: {
    /* 如果图表数据是后台获取的，监听父组件中的数据变化，重新触发Echarts */
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      },
    },
  },
  mounted() {
    /* 图表初始化 */
    this.$nextTick(() => {
      this.initChart();
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    /* 释放图表实例 */
    this.chart.dispose();
    /* dispose 会释放内部占用的一些资源和事件绑定，但是解除实例的引用我们是做不到的，所以需要重新赋值为null */
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el);
      this.setOptions(this.chartData);
    },
    setOptions({ data, color } = {}) {
      this.chart.setOption({
        legend: {
          // 图例文字颜色
          textStyle: {
            color: "#333",
          },
        },
        tooltip: {
          trigger: "item",
        },
        grid: {
          top: 35,
          left: "2%",
          right: "2%",
          bottom: "3%",
          containLabel: true,
        },
        color,
        series: [
          {
            type: "pie",
            data,
          },
        ],
      });
    },
  },
};
</script>

