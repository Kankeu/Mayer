require("./bootstrap")
let Echo = require('laravel-echo')
window.Echo  = new Echo({
    broadcaster: "socket.io",
    host: window.location.hostname + ':6001'
})
require("lodash")

import vueRouter from 'vue-router'
import nprogress from 'vue-progressbar'
import VueImg from './components/compte/v-img/v-img'
import main from './components/compte/app/App.vue'
import Redirect from './routes/Redirect'
import methodsGlobal from './plugins/MethodsGlobal'
import validateRules from './plugins/ValidateRules'
import notifications from 'vue-notification'

import vueM from "vue-material"
import 'vue-material/dist/vue-material.css'

Vue.use(validateRules)
Vue.use(methodsGlobal)
Vue.use(notifications)
Vue.use(vueM)
Vue.use(VueImg)

Vue.use(vueRouter)
Vue.use(nprogress,{height:'10px'})

Vue.http.interceptors.push(function(request, next) {
    new Redirect(request,next)
})

const router = new vueRouter({
    mode: "history",
    routes: [
        {
            path: "/home",
            component: resolve => require(['./components/compte/home/Home.vue'], resolve),
            name: "HOME",
        },
        {
            path: "/magazin",
            component: resolve => require(['./components/compte/magazin/Magazin.vue'], resolve),
            name: "MAGAZIN"
        },
        {
            path: "/panier",
            component: resolve => require(['./components/compte/panier/Panier.vue'], resolve),
            name: "PANIER"
        },
        {
            path: "/commandes",
            component: resolve => require(['./components/compte/commandes/Commandes.vue'], resolve),
            name: "COMMANDES"
        },
        {
            path: "/boutique",
            component: resolve => require(['./components/compte/boutique/Boutique.vue'], resolve),
            name: "BOUTIQUE"
        },
        {
            path: "*",
            redirect: "/home"
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
