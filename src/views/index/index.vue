<template>
  <div class="index-container">
    <!-- 将整个页面设置为背景图片 -->
    <div class="background-image"></div>
  </div>
</template>

<script>
export default {}
</script>

<style>
/* 设置整个页面为 flex 容器，使背景图片占满整个屏幕 */
.index-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0; /* 设置一个备用背景色 */
}

/* 设置背景图片样式 */
.background-image {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: calc(100vh - 61px);
  background-image: url("../../assets/home.png"); /* 设置背景图片路径 */
  background-size: cover; /* 背景图片按比例放大或缩小以填充整个容器 */
  background-repeat: no-repeat; /* 禁止背景图片重复 */
}

</style>
