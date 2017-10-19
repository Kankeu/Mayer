import Vue from 'vue'

const state = {
    panier: [],
    loadPanier: true
}

const mutations = {
    ADD_COMMANDES(state,data) {
        state.panier.push(data.commande)
        state.panier.sort((a,b)=> b.id-a.id)
    },
    REMOVE_COMMANDES:(state, id)=> {
        let commande = state.panier.filter((data)=> data.id === id)
        state.panier.splice(state.panier.indexOf(commande), 1)
    },
    CONFIRM_COMMANDES: (state,data) => {data.item.etat = 1},
    LOADPANIER: (state) => state.loadPanier = false
}
const getters = {
    panier: (state, getters) => state.panier,
    get_Last_panier_id: (state) => (state.panier[0]) ? state.panier[0].id : false,
    getLoadPanier: (state) => state.loadPanier
}

const actions = {
    loadPanier({commit,getters}){
        let url = (getters.get_Last_panier_id) ? '/cart/'+getters.get_Last_panier_id : '/cart/'
        Vue.http.get(url).then((response)=>{
            response.json().then((data)=>{
                data.map((commande)=>{commit('ADD_COMMANDES',{commande})})
                commit('LOADPANIER')
            })
        },(error)=>{
        })
    },
    remove({commit},item){
        Vue.http.delete('/cart/'+item.id).then((reponse)=>{
            commit('REMOVE_COMMANDES', item.id)
            commit('ArticlesStore/REMOVE_COMMANDES', {article:item.article},{root:true})
        })
    },
    confirm({commit},item){
        Vue.http.put('/cart/'+item.id,{id:item.article.id,etat:1,quantite:item.quantite}).then((reponse)=>{
            commit('CONFIRM_COMMANDES',{item})
        })
    },
}

let store = {
    namespaced: true,
    state,
    mutations,
    getters,
    actions,
}
export default store
