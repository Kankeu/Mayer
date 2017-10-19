import store from '../store/Store'

const status = []

class Model{
    constructor(){
        this.state = store.state.articles
    }

    getAllArticles(order){
        if(!order) return this.state
        let articles = _.cloneDeep(this.state)
        if(order==="desc") return articles.sort((a,b)=>b.id-a.id)
        if(order==="asc") return articles.sort((a,b)=>a.id-b.id)
    }

    saveArticles(articles){
        store.commit('ADD_ARTICLES',articles)
    }

    getMoreArticles(id){
        return this.state.filter(article=>article.id<id)
    }
}

class ArticlesController extends Model{
    constructor (request,next){
        super()
        this.request = request
        this.next = next
    }
    index(){
        if(this.getAllArticles().length===0){
            this.next((response)=>{
                if(response.body && response.body.length>0) this.saveArticles(response.body)
            })
            return true
        }
        this.next(this.request.respondWith(this.getAllArticles("desc"), {
            status: 200,
            statusText: "Already have",
        }));
    }

    store(){

    }

    show(id){
        this.next()
    }

    update(){

    }

    destroy(id){

    }

}
 export default ArticlesController