import store from "../store/Store"

class Model {
    constructor(){
        this.state = store.state.commandes
    }

    getCommandes(){
       return  this.state.filter
    }
}

class CommandesController extends Model{
    constructor(request,next){
        super()
        this.request = request
        this.next = next
    }

    index(...id){
        console.log(id)
        this.next()
    }

    update(){
        this.next()
    }
}

export default CommandesController