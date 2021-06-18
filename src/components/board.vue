<template>
  <div class="board">
    <!-- eslint-disable-next-line -->
    <div class="row" v-for="(item,row) in board" :class="{available: rowAvailable(row)}">
      <!-- eslint-disable-next-line -->
      <span class="poker"
            @click="click(row,i)"
            v-for="(state,i) in item"
            :class="{
              'active': state === 'active',
              'selected': state === 'selected',
              'available': state === 0,
            }">
      </span>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Board',
  data () {
    return {}
  },
  computed: {
    ...mapState({
      board: (state) => state.game.board,
      row: (state) => state.game.activeRow
    })
  },
  methods: {
    ...mapActions({
      PickPorker: 'game/PickPorker'
    }),
    click (row, i) {
      this.PickPorker({ row, i })
    },
    rowAvailable (row) {
      return this.board.toString().includes('active') === false || this.board[row].includes('active') === true
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
