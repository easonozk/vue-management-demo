<template>
  <el-form ref="form" :model="form" label-width="100px" :inline="inline">
    <el-form-item
      v-for="item in formLabel"
      :key="item.type"
      :label="item.label"
    >
      <el-input
        v-if="item.type === 'input'"
        v-model="formData[item.model]"
        :placeholder="'请输入' + item.label"
      >
      </el-input>
      <el-date-picker
        v-if="item.type === 'date'"
        v-model="formData[item.model]"
        type="date"
        placeholder="选择日期"
        value-format="yyyy-MM-dd"
      ></el-date-picker>
      <el-select
        v-if="item.type === 'select'"
        v-model="formData[item.model]"
        placeholder="请选择"
      >
        <el-option
          v-for="item in item.opts"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label=""><slot></slot></el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "CommonForm",
  data() {
    return {
      formData: this.form,
    };
  },
  props: {
    formLabel: Array,
    form: Object,
    inline: Boolean,
  },
};
</script>

<style>
</style>