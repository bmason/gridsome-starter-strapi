// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'
import Vuex from 'vuex'
import axios from 'axios'

export default function (Vue, { appOptions, router }) {
  Vue.use(Vuex)

  Vue.prototype.$http = axios;

  const token = process.isClient ? localStorage.getItem(`Bearer ${token}`) : false

  if (token) {
    Vue.prototype.$http.defaults.headers.common['Authorization'] = `Bearer ${token}`
    console.log('token is active',token)
  }
  console.log('token is active',token)

  router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)){
      if(appOptions.store.getters.isLoggedIn) {
        next()
        return
      }
      next('/')
    } else {
      next()
    }
  })

  appOptions.store = new Vuex.Store({
    state: {
      status: '',
      token: process.isClient ? localStorage.getItem('token') || '' : false,
      user: {}
    },

    mutations: {
      AUTH_REQUEST(state){
        state.status = 'loading'
      },
      AUTH_SUCCESS(state, token, user) {
        state.status = 'success',
        state.token = token,
        state.user = user
      },
      AUTH_ERROR(state){
        state.status = 'error'
      },
      LOGOUT(state){
        state.status = 'logged out',
        state.token = ''
      }
    },

    actions: {

      async login({ commit }, user) {
        commit('AUTH_REQUEST')
        await axios.post('https://aqueous-bastion-06425.herokuapp.com/auth/local/', user)
          .then(response => {
            const token = response.data.jwt
            const user = response.data.user

            if (process.isClient) {
              localStorage.setItem('token', token)
              localStorage.setItem('user', JSON.stringify(user))
            }
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            const something =  axios.defaults.headers.common['Authorization']
            console.log({something})
            commit('AUTH_SUCCESS', token, user)
            console.log({user, token})
          })

          .catch(err => {
            commit('AUTH_ERROR')
            process.isClient ? localStorage.removeItem('token') : false
            console.error(err)
          })
      },

      async register({commit}, user) {
        commit('AUTH_REQUEST')
        await axios.post('https://aqueous-bastion-06425.herokuapp.com/auth/local/register', user)
          .then(response => {
            const token = response.data.jwt
            const user = response.data.user

            process.isClient ? localStorage.setItem('token', token) : false

            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

            commit('AUTH_SUCCESS', token, user)
          })
          .catch(err => {
            commit('AUTH_ERROR')
            process.isClient ? localStorage.removeItem('token') : false
            console.error(err)
          })

      },

      logout({commit}){
		    return new Promise((resolve, reject) => {
            commit('LOGOUT')
            console.log('Logged out')

		      	process.isClient ? localStorage.removeItem('token') : false
		      	delete axios.defaults.headers.common['Authorization']
		      	resolve()
		    })
	  	}


    },

    getters: {
      isLoggedIn: state =>  !!state.token,
      authStatus: state => state.status
    }


  })
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
}
