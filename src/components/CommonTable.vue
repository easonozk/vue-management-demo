<template>
  <div class="common-table">
    <el-table :data="tableData" style="width: 100%" stripe height="90%">
      <el-table-column
        show-overflow-tooltip
        v-for="item in tableLabel"
        :key="item.prop"
        :label="item.label"
        :width="item.width || '125px'"
      >
        <template slot-scope="scope">
          <span style="marign-left: 10px">{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="180" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" @click="handleDelect(scope.row)" type="danger"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- current-page	当前页数，支持 .sync 修饰符 
    current-change	currentPage 改变时会触发
    :page-size 当前分页数默认值
    -->
    <el-pagination
      class="pager"
      layout="prev, pager, next"
      :total="localConfig.total"
      :current-page.sync="localConfig.page"
      @current-change="changePage"
      :page-size="20"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "CommonTable",
  data() {
    return {
      localConfig: this.config,
    };
  },
  props: {
    tableData: Array,
    tableLabel: Array,
    config: Object,
  },
  watch: {
    config: {
      handler(val) {
        this.localConfig = val;
      },
      immediate: true,
      deep: true,
    },
  },

  methods: {
    handleEdit(row) {
      console.log(this.localConfig.page, " handleEdit");
      this.$emit("edit", row);
    },
    handleDelect(row) {
      this.$emit("del", row);
    },
    changePage(page) {
      this.$emit("changePage", page);
    },
  },
};
</script>

<style lang="less" scoped>
.common-table {
  height: 540px;
  background-color: #fff;
  position: relative;
  .pager {
    position: absolute;
    bottom: 0;
    right: 20px;
  }
}
</style>