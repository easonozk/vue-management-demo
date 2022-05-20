<template>
  <el-menu
    default-active="1-4-1"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
  >
    <h3>{{ isCollapse ? "后台" : "通用后台管理系统" }}</h3>
    <el-menu-item
      v-for="item in noChild"
      :index="item.path"
      :key="item.path"
      @click="clickMenu(item)"
    >
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu v-for="item in hasChild" :index="item.icon" :key="item.icon">
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group
        v-for="(subItem, subIndex) in item.children"
        :index="subIndex"
        :key="subItem.path"
      >
        <el-menu-item
          @click="clickMenu(subItem)"
          :index="subIndex.toString()"
          >{{ subItem.label }}</el-menu-item
        >
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      menu: [],
      // menu: [
      //   {
      //     path: "/",
      //     name: "home",
      //     label: "首页",
      //     icon: "s-home",
      //     url: "Home/Home",
      //   },
      //   {
      //     path: "/commodity",
      //     name: "commodity",
      //     label: "商品管理",
      //     icon: "video-play",
      //     url: "commodityManage/commodityManage",
      //   },
      //   {
      //     path: "/user",
      //     name: "user",
      //     label: "用户管理",
      //     icon: "user",
      //     url: "UserManage/UserManage",
      //   },
      //   {
      //     label: "其他",
      //     icon: "location",
      //     children: [
      //       {
      //         path: "/page1",
      //         name: "page1",
      //         label: "页面1",
      //         icon: "setting",
      //         url: "Other/PageOne",
      //       },
      //       {
      //         path: "/page2",
      //         name: "page2",
      //         label: "页面2",
      //         icon: "setting",
      //         url: "Other/PageTwo",
      //       },
      //     ],
      //   },
      // ],
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    clickMenu(item) {
      this.$router.push({
        name: item.name,
      });
      //面包屑 选择菜单
      this.$store.commit("SelectMenu", item);
    },
  },
  computed: {
    noChild() {
      return this.asyncMenu.filter((item) => !item.children);
    },
    hasChild() {
      return this.asyncMenu.filter((item) => item.children);
    },
    isCollapse() {
      console.log(this.$store);
      return this.$store.state.tab.isCollapse;
    },
    asyncMenu() {
      return this.$store.state.tab.menu;
    },
  },
  // 用vuex实现
  // mounted() {
  //   this.$bus.$on("isCollapse", () => (this.isCollapse = !this.isCollapse));
  // },
  // beforeDestroy() {
  //   this.$bus.$on("isCollapse");
  // },
  //用路由重定向解决
  // created() {
  //   //初始时自动点击一次首页，让页面默认加载在首页
  //   this.clickMenu(this.menu[0]);
  // },
};
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  height: 100vh;
  border: 0;
  h3 {
    color: #fff;
    text-align: center;
    line-height: 48px;
  }
}
</style>
