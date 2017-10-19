import store from '../store/Store'

class Model{
  constructor(){
    this.state  = store.state.paniers
    this.articles = store.state.articles
  }

  getPanier(){
    return this.state
  }

  getArticle(article_id){
    return this.articles.find(article=>article.id===article_id)
  }

  saveCommandes(article_id,commandes){
    store.commit('ADD_PANIER',{article_id,commandes})
  }

  ConfirmPanier(id){
    store.commit('CONFIRM_PANIER',id)
  }

  destroyCommande(article_id){
    store.commit('DELETE_PANIER',article_id)
  }
}

class PanierController extends Model{
  constructor(request,next){
    super()
    this.request = request
    this.next = next
  }

  index(){
    if(this.getPanier().length===0){
      this.next(response=>{
        if(response.body && response.body.length>0){
        this.saveCommandes(null,response.body)
        }
      })
    }else{
      this.next(this.request.respondWith(this.getPanier(), {
          status: 200,
          statusText: "Already have",
      }));
    }
  }

  store(){
    this.next(response=>{
      if(response.body && response.body.length>0 && response.status === 200){
        let article_id = response.body[0].article_id
        console.log(response.body)
        response.body[0].article  = this.getArticle(article_id)
        this.saveCommandes(article_id,response.body)
      }
    })
  }

  show(id){

  }

  update(id){
    this.next()
    this.ConfirmPanier(id)
  }

  destroy(id){
    this.next()
    this.destroyCommande(id)
  }
}

export default PanierController
