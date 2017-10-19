import store from '../store/Store'

class model{
    constructor(){

    }

    saveDimension(payload){
        store.commit('ADD_DIMENSION',payload)
    }
}

class DimensionsController extends model{
    constructor(request,next){
        super()
        this.request = request
        this.next = next
    }

    store(){
      console.log(this.request)
        this.next(response=>{
              if(response.body && response.body.length>0) this.saveDimension({article_id:JSON.parse(this.request.getBody()).article_id,dimension:response.body})
        })
    }
}

export default DimensionsController
