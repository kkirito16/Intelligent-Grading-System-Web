<template>
  <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
    <el-tab-pane label="考试" name="first">
      <paperListVue></paperListVue>
    </el-tab-pane>
    <el-tab-pane label="试卷" name="second">
      <paperListVue></paperListVue>
    </el-tab-pane>
    <el-tab-pane label="试题" name="third">
      <paperListVue></paperListVue>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import paperListVue from "./paperList.vue"
export default {
  components: {
    paperListVue,
  },
  data() {
    return {
      activeName: "first",
    }
  },
  methods: {
    handleClick(tab, event) {},
  },
}
</script>
<style></style>
