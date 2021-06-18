<template>
  <div class="setting">
    <el-form ref="form" label-width="80px">
      <el-form-item label="玩家昵称">
        <el-input v-model="players" placeholder='输入两位玩家的昵称(以,分隔)，比如"A,B"'></el-input>
      </el-form-item>
      <el-form-item label="参数设置">
        <el-input v-model="board" placeholder='输入行数与数量(以,分隔)，如"3,5,7"'></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="submit" :disabled="!board || !players" type="primary">设置</el-button>
        <el-tooltip placement="bottom" effect="light">
          <div slot="content" v-html="fillTip"></div>
          <el-button @click="fillAndSubmit" type="info" icon="el-icon-info">设置默认</el-button>
        </el-tooltip>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>

import { mapActions } from 'vuex'

export default {
  name: 'Setting',
  data: () => {
    return {
      default: {
        players: ['A,B'],
        board: ['3,5,7']
      }
    }
  },
  computed: {
    fillTip () {
      return `玩家昵称：${this.default.players}<br />参数设置：${this.default.board}`
    },
    players: {
      get: function () {
        return this.$store.state.setting.players.join(',')
      },
      set: function (v) {
        this.SetPlayer(v)
        return v
      }
    },
    board: {
      get: function () {
        return this.$store.state.setting.board.join(',')
      },
      set: function (v) {
        this.SetBoard(v)
        return v
      }
    }
  },
  methods: {
    ...mapActions({
      SetBoard: 'setting/SetBoard',
      SetPlayers: 'setting/SetPlayers'
    }),
    submit () {
      if (this.players.split(',').length !== 2) {
        this.$message.error('玩家昵称验证不通过')
        return
      }
      if (this.board.split(',').every(i => (i > 0)) === false) {
        this.$message.error('参数设置验证不通过')
        return
      }
      this.SetBoard(this.board.split(','))
      this.SetPlayers(this.players.split(','))
      this.$message.success('游戏设置成功，将进入游戏界面')
      setTimeout(() => {
        this.$router.push({ path: '/game' })
      }, 1000)
    },
    fill () {
      this.SetBoard(this.default.board)
      this.SetPlayers(this.default.players)
    },
    fillAndSubmit () {
      this.fill()
      this.submit()
    }
  }
}

</script>
<style lang="scss">

</style>
