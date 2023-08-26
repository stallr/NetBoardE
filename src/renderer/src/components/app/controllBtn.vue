<template>
  <div class="controlBtn">
    <el-icon @click="min"><Minus /></el-icon>
    <el-icon @click="hide"><Close /></el-icon>
  </div>
</template>

<script setup>
  const hide = ()=>{
    window.api.hide();
  }
  const min = ()=>{
    window.api.minimize();
  }
</script>

<style scoped>
  .controlBtn{
    height:25px;
    width: 50px;
    background-color: #fff;
   z-index: 100;
    display: flex;
    position: fixed;
    top: 0;
    right: 0;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 10px;
  }
</style>
