export default {
    ADD_COMMENTAIRES(state,{commentaires,count}){
        state.commentaires.push(...commentaires)
        if(count) state.articles.find(article=>article.id===commentaires[0].article_id).commentaires_count++
    },
    ADD_REPONSES_COMMENTAIRES(state,{reponses,count,parent_id}){
        let commentaire = state.commentaires.find(commentaire=>commentaire.id===parent_id)
        if(!commentaire.reponses) commentaire.reponses = []
        commentaire.reponses.push(...reponses)
        if(count) commentaire.reponses_count++
    },
    DELETE_COMMENTAIRES(state,id){
        let index = null
        let commentaire = state.commentaires.find(commentaire=>commentaire.id===id || (commentaire.reponses && commentaire.reponses.find(reponse=>reponse.id===id)))
        if(!commentaire.reponses) commentaire.reponses = []
        let reponse = commentaire.reponses.find(reponse=>reponse.id===id)
        if(reponse) commentaire.reponses_count--
        if(reponse && index>=0){
            index = commentaire.reponses.indexOf(reponse)
            if(index>=0) return commentaire.reponses.splice(index,1)
        }
        state.articles.find(article=>article.id===commentaire.article_id).commentaires_count--
        index = state.commentaires.indexOf(commentaire)
        if(index>=0) state.commentaires.splice(index,1)
    },
}