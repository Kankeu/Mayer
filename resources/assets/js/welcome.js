require('./bootstrap')

import Vue from 'vue'
import vueRouter from 'vue-router'
import vueM from 'vue-material'
import 'vue-material/dist/vue-material.css'
import nprogress from 'vue-progressbar'
import validate from './plugins/ValidateRules'

Vue.use(vueRouter)
Vue.use(vueM)
Vue.use(nprogress,{height:'10px'})
Vue.use(validate)

import main from './components/welcome/app/App.vue'

const router = new vueRouter({
    mode: "history",
    routes: [
        {
            path: "/",
            component: resolve => require(['./components/welcome/accueil/Accueil.vue'], resolve),
            name: "ACCUEIL",
        },
        {
            path: "/inscription",
            component: resolve => require(['./components/welcome/inscription/Inscription.vue'], resolve),
            name: "INSCRIPTION"
        },
        {
            path: "*",
            redirect: "/"
        }
    ]
})

Vue.material.registerTheme({
    default: {
        primary: 'blue',
        accent: 'red'
    },
    green: {
        primary: 'green',
        accent: 'pink'
    },
    orange: {
        primary: 'orange',
        accent: 'green'
    },
})

const app = new Vue({
    components: {app:main},
    el: "#main",
    router,
})
