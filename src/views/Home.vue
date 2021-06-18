<template>
  <div id="app">
    <el-row>
      <el-button @click="submit" type="primary">快速开始游戏</el-button>
      <el-button @click="setting">游戏设置</el-button>
    </el-row>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data: () => {
    return {
    }
  },
  computed: {
  },
  methods: {
    submit () {
      this.$router.push({ path: '/game' })
    },
    setting () {
      this.$router.push({ path: '/setting' })
    }
  }
}

</script>
