<template>
  <div class="manage">
    <div v-if="dialogVisible">
      <el-dialog
        :title="operateType === 'add' ? '新增用户' : '更新用户'"
        :visible.sync="dialogVisible"
      >
        <common-form
          :formLabel="operateFormLabel"
          :form="operateFrom"
          :inline="true"
          ref="form"
        ></common-form>
        <div slot="footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirm">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="manage-header">
      <el-button type="primary" @click="addUser" style="height: 40px"
        >+ 新增</el-button
      >
      <common-form
        :formLabel="searchFormLabel"
        :form="searchFrom"
        :inline="true"
      >
        <el-button type="primary" @click="getList(searchFrom.keyword)"
          >搜索</el-button
        >
      </common-form>
    </div>
    <common-table
      :tableData="tableData"
      :tableLabel="tableLabel"
      :config="config"
      @changePage="getList()"
      @edit="editUser"
      @del="delUser"
    ></common-table>
  </div>
</template>

<script>
import CommonForm from "../../components/CommonForm.vue";
import CommonTable from "../../components/CommonTable.vue";
import { getUser } from "../../../api/data";
export default {
  components: { CommonForm, CommonTable },
  name: "user",
  data() {
    return {
      dialogVisible: false,
      operateType: "",
      operateFormLabel: [
        {
          model: "name",
          label: "姓名",
          type: "input",
        },
        {
          model: "age",
          label: "年龄",
          type: "input",
        },
        {
          model: "sex",
          label: "性别",
          type: "select",
          opts: [
            {
              label: "男",
              value: 1,
            },
            {
              label: "女",
              value: 0,
            },
          ],
        },
        {
          model: "birth",
          label: "出生日期",
          type: "date",
        },
        {
          model: "addr",
          label: "地址",
          type: "input",
        },
      ],
      operateFrom: {
        name: "",
        age: "",
        sex: "",
        birth: "",
        addr: "",
      },
      searchFormLabel: [
        {
          model: "keyword",
          label: "",
          type: "input",
        },
      ],
      searchFrom: {
        keyword: "",
      },
      tableData: [],
      tableLabel: [
        {
          prop: "name",
          label: "名字",
        },
        {
          prop: "age",
          label: "年龄",
        },
        {
          prop: "sex",
          label: "性别",
        },
        {
          prop: "birth",
          label: "出生日期",
          width: "150px",
        },
        {
          prop: "addr",
          label: "地址",
          width: "200px",
        },
      ],
      config: {
        total: 30,
        page: 1,
        loading: false,
      },
    };
  },
  methods: {
    addUser() {
      this.dialogVisible = true;
      this.operateType = "add";
      this.operateFrom = {
        name: "",
        age: "",
        sex: "",
        birth: "",
        addr: "",
      };
    },
    // 首先要判断有两种情况
    // 先判断弹窗的状态是新增还是编辑
    confirm() {
      if (this.operateType === "edit") {
        this.$axios.post("/user/edit", this.operateFrom).then((res) => {
          console.log(res, "edit");
          this.dialogVisible = false;
          this.getList();
        });
      } else {
        this.$axios.post("/user/add", this.operateFrom).then((res) => {
          console.log(res, "add");
          this.dialogVisible = false;
          this.getList();
        });
      }
    },
    editUser(row) {
      console.log(row, "editUser");
      this.dialogVisible = true;
      this.operateType = "edit";
      this.operateFrom = JSON.parse(JSON.stringify(row));
      console.log(this.operateFrom, "editUser");
    },
    delUser(row) {
      this.$confirm("此操作將永久刪除，是否继续", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "删除",
      }).then(() => {
        const id = row.id;
        this.$axios
          .get("/user/del", {
            params: { id },
          })
          .then(() => {
            this.$message({
              type: "success",
              message: "删除成功",
            });
            this.getList();
          });
      });
    },
    //name默认值写成‘ ’的话，因为编码格式会变成+，这里暂时写为null代替
    getList(name = null) {
      this.config.loading = true;
      name ? (this.config.page = 1) : " ";
      getUser({
        page: this.config.page,
        name,
      }).then((res) => {
        console.log(res, "getUser");
        this.tableData = res.data.list.map((item) => {
          item.sex = item.sex === 0 ? "女" : "男";
          return item;
        });
        console.log(this.tableData);
        this.config.total = res.data.count;
        this.config.loading = false;
      });
    },
  },
  created() {
    this.getList();
  },
};
</script>

<style lang="less" scoped>
.manage {
  margin-top: 10px;
}
.manage-header {
  display: flex;
  justify-content: space-between;
}
</style>