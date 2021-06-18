<template>
  <div class="game">
    <div class="flex">
      <template v-if="gameStatus!=='end'">
        <span>玩家：{{ player }}</span>
        <el-button
          :disabled="nextDisabled"
          @click="next">确定
        </el-button>
      </template>
      <el-button v-else @click="InitGame">重新开始</el-button>
    </div>
    <board @PickPorker="PickPorker"></board>
    <router-view/>
  </div>
</template>

<script>
import Board from '@/components/board'
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  name: 'Game',
  components: { Board },
  methods: {
    ...mapActions({
      InitGame: 'game/InitGame',
      PickPorker: 'game/UpdateBoard',
      NextPlayer: 'game/NextPlayer'
    }),
    next () {
      this.NextPlayer().then((winer) => {
        if (winer) {
          this.$router.push({ path: '/game/result' })
        }
      })
    }
  },
  computed: {
    ...mapGetters('game', ['nextDisabled']),
    ...mapState({
      gameStatus: (state) => state.game.status,
      player: (state) => state.game.activePlayer
    })
  },
  data: () => {
    return {}
  },
  mounted () {
    this.gameStatus === 0 && this.InitGame()
  }
}
</script>
