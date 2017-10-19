import routes from './Web'

function load(action,request,next,params) {
   let className = action.split('@')[0]
   let methodName = action.split('@')[1]
   return new Promise((resolve) =>{
       require(["../controllers/"+className],resolve)
   }).then(response=> (methodName) ? new response.default(request,next)[methodName](...params) : new response.default(request,next))
}



class Redirect
{
    constructor (request,next) {
        this.request = request
        this.next = next
        this.redirect()
    }

    redirect(){
        let url = this.request.getUrl()
          console.log(url)
        if(url[0] !== "/") url = "/"+url
        for(let item of routes){
            let result = url.match(new RegExp(item.path))
            if(result && result[0]===result.input && item.method === this.request.method){
                url = url.split('/')
                let  params = []
                result.map((item,i)=>{if(i!==0) params.push(Number(result[i]))})
                console.log(params,item.path)
                load(item.action,this.request,this.next,params)
                return true
            }
        }
    }
}
export default Redirect
