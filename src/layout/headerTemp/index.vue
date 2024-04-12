<template>
  <div class="header-temp-container">
    <div class="nav-links">
      <img src="../../assets/logo.png" class="logo" />
      <div class="platformIcon">慧阅智能阅卷平台</div>
      <el-menu
        :default-active="activeIndex"
        class="nav-menu"
        mode="horizontal"
        @select="handleMenuSelect"
      >
        <el-menu-item index="home">首页</el-menu-item>
        <el-menu-item index="grading">阅卷</el-menu-item>
        <el-menu-item index="analysis">数据分析</el-menu-item>
      </el-menu>
    </div>
    <div class="userInfo">
      <el-image :src="require('@/assets/admin.jpg')" class="eImage"></el-image>
      <el-dropdown @command="handleLogout">
        <div class="detail user-link">
          <span>阿瑾瑾瑾</span>
          <span>admin</span>
          <i class="el-icon--right"></i>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { Message } from "element-ui"
export default {
  name: "header-temp-container",
  data() {
    return {
      userInfo: JSON.parse(window.localStorage.getItem("userInfo")),
      activeIndex: "home", // 默认选中首页
    }
  },
  methods: {
    // 退出登录
    handleLogout(key) {
      if (key == "logout") {
        window.localStorage.removeItem("userInfo")
        Message({
          type: "success",
          message: "退出登录",
          showClose: true,
          duration: 3000,
        })
        this.$router.push({ path: "/login" })
      }
    },

    // 处理菜单选择
    handleMenuSelect(index) {
      if (this.$route.path === `/${index}`) {
        return
      }

      this.activeIndex = index
      switch (index) {
        case "home":
          this.$router.push("/index")
          break
        case "grading":
          this.$router.push("/grading/index")
          break
        case "analysis":
          this.$router.push("/analysis/index")
          break
        default:
          break
      }
    },
  },
}
</script>

<style scoped>
.header-temp-container {
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
}
.userInfo {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 20px;
}
.eImage {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}
.detail {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
}
.nav-links {
  display: flex;
  flex-direction: row;
  margin-right: 20px;
  justify-content: center;
  align-items: center;
}

.logo {
  width:95px;
  height: 50px;
  margin-left: 10px;
}
.platformIcon {
  align-content: center;
  align-items: center;
  margin-left: 10px;
  margin-right: 40px;
  font-size: 20px;
}
.nav-menu {
  background-color: transparent;
}
</style>
