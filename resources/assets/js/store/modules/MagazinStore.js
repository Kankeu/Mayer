const actions = {
    add_article({commit,getters},data){
        data.article.user = window.user
        data.article.panier = []
        data.article.likes = []
        data.article.liked_count = 0
        data.article.likes_count = 0
        data.article.commander_count = 0
        data.article.commentaires_count = 0
        let images = []
        data.images.map((file) => { images.push({id:"000",article_id:data.article.id,path:URL.createObjectURL(file)})})
        data.article.images = images
        commit('PREPEND_ARTICLES', data.article, {root:true})
        commit('BoutiqueStore/PREPEND_ARTICLES', data.article, {root:true})
    },
}

let store = {
    namespaced: true,
    actions,
}
export default store
