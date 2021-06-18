import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Setting from '../views/Setting.vue'
import Game from '../views/Game.vue'
import Result from '../views/Result.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Setting',
    name: 'Setting',
    component: Setting
  },
  {
    path: '/game',
    name: 'Game',
    component: Game,
    children: [{
      path: '/game/result',
      name: 'Result',
      component: Result
    }]
  }
]

const router = new VueRouter({
  routes
})

export default router
