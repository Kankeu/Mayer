const state = {
    articles:[],
}


const mutations = {
    ADD_ARTICLES(state,articles){
        state.articles.push(...articles)
    },
}

let store = {
    namespaced: true,
    state,
    mutations,
}
export default store
