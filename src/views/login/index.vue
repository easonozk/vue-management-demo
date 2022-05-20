<template>
  <el-form
    :model="form"
    status-icon
    :rules="rules"
    ref="form"
    label-width="100px"
    class="login-container"
  >
    <h3 class="login_title">系统登录</h3>
    <el-form-item
      label="用户名"
      prop="userName"
      class="userName"
      label-width="80px"
    >
      <el-input v-model="form.userName" placeholder="请输入用户名"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password" label-width="80px">
      <!-- autocomplete 自动补全 -->
      <el-input
        type="password"
        v-model="form.password"
        autocomplete="off"
        placeholder="请输入密码"
      ></el-input>
    </el-form-item>

    <el-form-item class="login_submit">
      <el-button type="primary" @click="submitForm('form')">提交</el-button>
      <el-button @click="resetForm('form')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { getMenu } from "../../../api/data";
export default {
  name: "login",
  data() {
    return {
      form: {},
      rules: {
        userName: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { min: 5, message: "长度不能低于五位", trigger: "blur" },
        ],
        password: [
          // message——校验失败的提示信息，trigger——触发方式
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 5, message: "长度不能低于五位", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm() {
      //页面跳转
      getMenu(this.form).then(({ data: res }) => {
        console.log(res, "res");
        if (res.code === 20000) {
          /* 如果成功，需要将接口返回的token拿到，然后给它设置进去。同时需要给不同的账号配置上不同的菜单权限。
          最后进行路由跳转。*/

          // 接下来可以在这里面写具体的store的mutation的调用。
          // 在登录成功之后，第一步先清除当前路由
          this.$store.commit("clearMenu");
          // 设置menu
          this.$store.commit("setMenu", res.data.menu);
          console.log(res.data.menu, "res.data.menu");
          // 设置token
          this.$store.commit("setToken", res.data.token);
          // 动态添加路由
          this.$store.commit("addMenu", this.$router); // 传入当前的router实例
          console.log(this.$router.addRoute, "this.$router");
          // 最后一步，进行页面的跳转
          console.log(
            this.$router.push({ name: "home" }),
            'this.$router.push({ name: "home" });'
          );
          this.$router.push({ name: "home" });
          // 接下来将CommonAside组件里的写死的menu进行替换
        } else {
          // 否则对异常进行抛出
          this.$message.warning(res.data.message);
        }
      });
    },
    //resetFields	对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px;
  padding-bottom: 15px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.login_title {
  margin: 0 auto 40px auto;
  text-align: center;
  color: #505458;
}

.login_submit {
  margin: 10px auto 0 auto;
}
</style>