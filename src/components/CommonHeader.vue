<template>
  <header>
    <div class="l-header">
      <el-button
        icon="el-icon-menu"
        size="mini"
        @click="isCollapse"
      ></el-button>
      <!-- <h3 style="color: #fff">首页</h3> -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          v-for="item in tabs"
          :key="item.name"
          :to="{ path: item.path }"
          >{{ item.label }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <div class="r-header">
      <el-dropdown trigger="click" size="mini">
        <span>
          <img class="user" :src="userImg" alt="" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a">个人中心</el-dropdown-item>
          <el-dropdown-item command="b" @click.native="logOut"
            >退出</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import userImg from "../assets/images/user.png";
import { mapState } from "vuex";
export default {
  name: "CommonHeader",
  data() {
    return {
      userImg,
    };
  },
  methods: {
    isCollapse() {
      this.$store.commit("CollapseMenu");
    },
    logOut() {
      this.$store.commit("clearToken");
      this.$store.commit("clearMenu");
      this.$router.push({ name: "login" });
    },
  },
  computed: {
    ...mapState({ tabs: (state) => state.tab.tabList }),
  },
};
</script>

<style lang="less" scoped>
::v-deep .el-breadcrumb__item:last-child .el-breadcrumb__inner {
  color: #fff;
}
::v-deep .el-breadcrumb__inner.is-link {
  color: #606266;
}
// .el-breadcrumb ::v-deep .el-breadcrumb__inner {
//   color: #d9bb95 !important;
// }
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
header {
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;

  .l-header {
    display: flex;
    justify-content: space-around;
    align-items: center;
    .el-button {
      margin-right: 20px;
    }
  }
  .r-header {
    .user {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
}
</style>