<template>
  <div class="result">
    <h2 class="title">游戏结束</h2>
    <p class="msg">恭喜{{ winer }}获得胜利</p>
    <el-button @click="back">返回游戏</el-button>
    <el-button @click="next">再来一局</el-button>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Result',
  methods: {
    ...mapActions({
      InitGame: 'game/InitGame'
    }),
    back () {
      this.$router.push({ path: '/game' })
    },
    next () {
      this.InitGame()
      this.$router.push({ path: '/game' })
    }
  },
  computed: {
    ...mapState({
      winer: (state) => state.game.winer
    })
  }
}
</script>
