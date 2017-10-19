import store from '../store/Store'

class model{
  like(id,type){
    store.commit('LIKE',{id,type})
  }
}

class  LikesController extends model{
  constructor(request,next){
    super()
    this.request = request
    this.next = next
  }

  article(id)
  {
     this.like(id,"article")
     this.next()
  }

  commentaire(id){
    this.like(id,"commentaire")
    this.next()
  }
}

export default LikesController
