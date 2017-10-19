import Vuex from 'vuex'
import MagazinStore from './modules/MagazinStore'
import PanierMutations from './modules/PanierMutations'
import CommentaireMutations from './modules/CommentaireMutations'


const state={
    articles:[],
    commentaires:[],
    paniers:[],
    commandes: [],
}

const mutations = {
    ADD_ARTICLES(state,articles){
        state.articles.push(...articles)
    },
    LIKE(state,{id,type}){
        let items = []
        if(type==="article") items.push(state.articles.find(article=>article.id===id))
        if(type==="commentaire") items.push(state.commentaires.find(commentaire=>commentaire.id===id))
        if(!items[0]) items = state.commentaires.map(commentaire=>{let reponse = commentaire.reponses.find(reponse=>reponse.id===id);if(reponse) return reponse})
        if(!items[0] || items[0].parent_id){
            let result = state.commentaires.find(commentaire=>commentaire.previewsreponse && commentaire.previewsreponse.id===id)
            if(result) items.push(result.previewsreponse)
        }
        items.map(item=>{
            if(item){
                if(item.liked === 1) {item.liked = 0; item.likes_count--; return true}
                if(item.liked === 0) {item.liked = 1; item.likes_count++; return true}
            }
        })
    },
    ADD_DIMENSION(state,{article_id,dimension}){
        let article = state.articles.find(article=>article.id===article_id)
        article.dimension = dimension
    },
    ...CommentaireMutations,
    ...PanierMutations,
}

let store = new Vuex.Store({
    state,
    mutations,
    strict: true,
    modules:{
        MagazinStore,
    },
})

export default store
