// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import DefaultLayout from '~/layouts/Default.vue'
import Vuex from 'vuex'
import axios from 'axios'
import './css/tailwind.css'
import VueFormulate from '@braid/vue-formulate'

export default function (Vue, { appOptions, router, head }) {
	Vue.use(Vuex)
	Vue.use(VueFormulate, {
		classes: {
			outer: 'mb-4',
			input(context) {//console.log('context', context.classification, context);
			  switch (context.classification) { 
				case "button":
				  return " px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600";
				case "text":
				  return "border-solid border-gray-400 border-b-2 rounded px-3 py-2 leading-none focus:border-green-500 focus:border-2 outline-none border-box w-full mb-1";
			  }
			},			
			label: 'font-medium text-sm',
			help: 'text-xs mb-1 text-gray-600',
			error: 'text-red-700 text-xs mb-1',

		}
	})
	
  window.localStorage.setItem('vueVersion', Vue.version); 

  head.link.push({
    rel: 'stylesheet',
    href: 'https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css',
  })
  
  head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900',
  });
  
  const opts = { } //opts includes, vuetify themes, icons, etc.
  Vue.use(Vuetify)
  
  appOptions.vuetify = new Vuetify(opts);


  Vue.prototype.$http = axios;
  
  const strapiApi = 'http://localhost:1337/api' ; //env('STRAPI_API_URL')

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
