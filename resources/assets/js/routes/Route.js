
class Route{
    constructor(){
        this.result = []
        this.types = [
            {
                method: "GET",
                action: "index",
            },
            {
                method: "POST",
                action: "store"
            },
            {
                method: "GET",
                action: "show",
                params: "([0-9]+)"
            },
            {
                method: "PUT",
                action: "update",
                params: "([0-9]+)"
            },
            {
                method: "DELETE",
                action: "destroy",
                params: "([0-9]+)"
            },
            ]
    }

    resource(path,className) {
        className = className.trim()
        path = path.trim()
        this.types.map((type)=>this.result.push({
            method: type.method,
            path: (type.params) ? path+'/'+type.params : path,
            action: className+'@'+type.action
        }))
        return this
    }

    all(){
        return this.result
    }

    except(...methodNames){
      methodNames.forEach(methodName=>{
        let route = this.result.find(route=>route.action.split('@')[1]===methodName.trim())
        this.result.splice(this.result.indexOf(route),1)
      })
      return this.result
    }

    only(...methodNames){
      let result = []
      methodNames.forEach(methodName=>{
        let route = this.result.find(route=>route.action.split('@')[1]===methodName.trim())
        if(route) result.push(route)
      })
      return result
    }

    get(path,action){
        return {
            method: "GET",
            path: path,
            action: action
        }
    }

    post(path,action){
        return {
            method: "POST",
            path: path,
            action: action
        }
    }

    show(path,action){
        return {
            method: "GET",
            path: path,
            action: action
        }
    }

    put(path,action){
        return {
            method: "PUT",
            path: path,
            action: action
        }
    }

    delete(path,action) {
        return {
            method: "DELETE",
            path: path,
            action: action
        }
    }
}

export default Route
