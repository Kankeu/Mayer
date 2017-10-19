const install = function (Vue, options) {

  Vue.directive('observable', {
      bind (el,binding,vnode) {
          el.params = binding.value
          let observer = el.intersectionObserver = new IntersectionObserver(function (observables) {
              observables.forEach(function (observable) {
                      if(typeof el.params === "string"){
                        observable.target.classList.remove('not-visible')
                      }else{
                        el.params.callback.call(null, {data: el.params.data})
                      }
              },{threshold:[1]})
          })
          vnode.context.$nextTick(() => {
              observer.observe(el)
          })
      },
      componentUpdated(el,binding,vnode) {
        if(el.params != binding.value){
          vnode.context.$nextTick(() => {el.params = binding.value})
        }
      },
      unbind (el) {
          if (el.intersectionObserver) {
              el.intersectionObserver.disconnect()
              delete el.intersectionObserver
          }
      },
      })

      Vue.directive('commentable', {
          bind (el,binding,vnode) {
              el.addEventListener('click',el.EventClick = function (event) {
              if(binding.value.commentOpen === true) return vnode.context.$set(binding.value,'commentOpen',false)
              vnode.context.$set(binding.value,'commentOpen',true)

              })
          },
          unbind(el){
            if(el.EventClick){
              el.removeEventListener('click',el.EventClick)
              delete el.EventClick
            }
          }
      })

      Vue.directive('infintyScroll', {
          bind (el,binding,vnode) {
              let observer = el.intersectionObserver = new IntersectionObserver(function (observables) {
                  observables.forEach(function (observable) {
                      if(observable.isIntersecting){
                          binding.value.callback.call(null,vnode.context)
                      }
                  })
              })
              vnode.context.$nextTick(() => {
                  observer.observe(el)
              })
          },
          unbind (el) {
              if (el.intersectionObserver) {
                  el.intersectionObserver.disconnect()
                  delete el.intersectionObserver
              }
          }
      })

  Vue.filter('uppercase',function(data){
    return data.toUpperCase()
  })

  Vue.mixin({
    data(){
      return {
          user: window.user,
      }
    },
    methods:{
        parentNode(el,classeName){
            for(let i=0;i<15;i++){
                el = el.parentNode
                if(el.classList.contains(classeName)==true) return el
            }
        },
        pluriel(data, mot){
            mot = (data > 1) ? mot+'s' : mot
            return  data +' '+ mot
        },

        check (data){
            return (data===1) ? "check" : null
        },
        timerRelatif ({data}){
            let possibilites = [
                {
                    time: 0,
                    divide: 60,
                    text: "à l'instant"
                },
                {
                    time: 1,
                    divide: 60,
                    text: "Il y'a",
                    unite: "minute"
                },
                {
                    time: 1,
                    divide: 3600,
                    text: "Il y'a",
                    unite: 'heure'
                },
                {
                    time: 1,
                    divide: 86400,
                    text: "Il y'a",
                    unite: "jour"
                },
            ]
            data.date = (!data.date) ? data.created_at : data.date
            let time = (new Date().getTime() - new Date(data.date).getTime())/1000
            for (let item of possibilites.reverse()) {
                let quotien = Math.floor(time/item.divide)
                let msg
                if(quotien >= item.time){
                    if(item.unite === "jour"){
                        let date = new Date(data.date).toString().split(" ")
                        msg = date[2] + " " + date[1] + ". " + date[3] +" à "+ date[4].split(':')[0] +":"+ date[4].split(':')[1]
                    }else{
                        let pluriel = (quotien>1) ? item.unite+"s" : item.unite
                        msg = (item.unite) ? item.text +" "+item.time*quotien +" "+ pluriel : item.text
                    }
                    data.created_at = msg
                    break
                }
            }
        },
   }
  })
}
 export default install
