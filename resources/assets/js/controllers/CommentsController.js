import store from '../store/Store'

let status = {
  show:[],
  have(parent_id){
    return this.show.find(item=>item.parent_id===parent_id)
  }
}

class Model{
  constructor(){
    this.state = store.state.commentaires
  }

  saveCommentaires(commentaires,count){
    store.commit('ADD_COMMENTAIRES',{commentaires,count})
  }

  saveReponses(reponses,count,parent_id){
      store.commit('ADD_REPONSES_COMMENTAIRES',{reponses,count,parent_id})
  }

  destroyCommentaire(id){
    store.commit('DELETE_COMMENTAIRES',id)
  }

  getCommentaires(article_id){
    return this.state.filter(commentaire=>commentaire.article_id===article_id)
  }

  getMoreCommentaires(article_id,id){
    return this.state.filter(commentaire=>commentaire.article_id===article_id && commentaire.id>id)
  }

  getMoreResponses(article_id,parent_id,response_id){
    return this.state.find(commentaire=>commentaire.id===parent_id).reponses
  }
}

class CommentsController extends Model{
  constructor(request,next){
    super()
    this.request = request
    this.next = next
  }

  index(article_id){
    let commentaires = this.getCommentaires(article_id)
    if(commentaires.length===0){
      this.next((response)=>{
          response.body.data.map(data=>data.reponses=[])
          if(response.body.data && response.body.data.length>0) this.saveCommentaires(response.body.data)
    })
    return true
    }
    let response = {data:commentaires}
    this.next(this.request.respondWith(response, {
        status: 200,
        statusText: "Already have",
    }));
  }

  show(article_id,parent_id){
    if(!(status.have.call(status, parent_id) && this.getMoreResponses(article_id,parent_id))){
      this.next((response)=>{
        if(response.body && response.body.length>0) this.saveReponses(response.body,null,parent_id)
        status.show.push({"parent_id":parent_id})
    })
    return true
    }
    this.next(this.request.respondWith(this.getMoreResponses(article_id,parent_id), {
        status: 200,
        statusText: "Already have",
    }));
  }

  store(){
    this.next((response)=>{
        if(response.body && response.body.length>0){
         response.body[0].user = window.user
         if(!response.body[0].parent_id) this.saveCommentaires(response.body,true)
         if(response.body[0].parent_id) this.saveReponses(response.body,true,response.body[0].parent_id)
        }
    })
  }

  destroy(article_id,id){
    this.next()
    this.destroyCommentaire(id)
  }

  loadMore(article_id){
    this.next((response)=>{
          response.body.data.map(data=>data.reponses=[])
          if(response.body.data && response.body.data.length>0) this.saveCommentaires(response.body.data)
    })
  }
}

export default CommentsController
