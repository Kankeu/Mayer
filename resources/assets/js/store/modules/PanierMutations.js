export default {
    ADD_PANIER(state,{article_id,commandes}){
        state.paniers.push(...commandes)
        if(article_id) state.articles.filter(article=>article.id===article_id).map(article=>article.panier = commandes)
    },

    CONFIRM_PANIER(state,id){
        let index = state.paniers.indexOf(state.paniers.find(item=>item.id===id))
        if(index>=0) state.paniers.splice(index,1)
        state.articles.filter(article=>article.id=id).map(article=>{article.panier_count++})
    },

    DELETE_PANIER(state,id){
        let commande = state.paniers.find(item=>item.id===id)
        if(!commande) return false
        state.articles.filter(article=>article.id===commande.article_id).map(article=>{if(commande.etat===true) article.panier_count--;article.panier = []})
        let index = state.paniers.indexOf(commande)
        if(index>=0) state.paniers.splice(index,1)
    }
}