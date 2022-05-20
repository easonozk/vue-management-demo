<template>
  <div>
    <el-tag
      :key="tag.name"
      v-for="(tag, index) in tabs"
      :effect="$route.name === tag.name ? 'dark' : 'plain'"
      :closable="tag.name !== 'home'"
      :disable-transitions="false"
      @close="handleClose(tag, index)"
      @click="clickMenu(tag)"
    >
      {{ tag.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "CommonTag",
  data() {
    return {};
  },
  computed: {
    ...mapState({ tabs: (state) => state.tab.tabList }),
  },
  methods: {
    handleClose(tag, index) {
      //路由跳转
      if (index !== this.tabs.length - 1) {
        this.$router.push({
          name: this.tabs[index + 1].name,
        });
      } else {
        this.$router.push({
          name: this.tabs[index - 1].name,
        });
      }
      //删除tag
      this.tabs.splice(index, 1);
    },
    clickMenu(tag) {
      this.$router.push({
        name: tag.name,
      });
    },
  },
};
</script>

<style lang="less" scoped>
::v-deep .el-tag {
  margin: 10px 10px 0 0;
}
</style>