const mixin= {
        'Boutique': (url)=>{
            return {
                data(){
                    return {
                        articles: [],
                    }
                },
                methods:{
                    getArticles(){
                        this.$article.get().then((response)=>{
                              if(response.body && response.body.length>0) this.articles = _.cloneDeep(response.body)
                        },(error)=>{

                        })
                    },
                    loadMore(){
                        if(!this.articles.slice().reverse()[0]) return false
                        this.$article.get({id:this.articles.slice().reverse()[0].id}).then((response)=>{
                            if(response.body && response.body.length>0) this.articles = this.articles.concat(_.cloneDeep(response.body))
                        },(error)=>{
                            this.$refs.snackbar.open()
                        })
                    },
                    setDimension({article}){
                        this.$http.post('/articles/dimension/',{article_id:article.id, x:article.dimension.x}).then((response)=>{
                            response.json().then((data)=>{

                            })
                        },(error)=>{

                        })
                    },
                    putDimension({article}){
                        this.$http.put('/articles/dimension/'+article.dimension.id,{article_id:article.id, x:article.dimension.x}).then((response)=>{
                            response.json().then((data)=>{

                            })
                        },(error)=>{

                        })
                    },
                    resize(article){
                        if(!article.dimension){article.dimension = {x:30,y:100}}
                        if(article.dimension.x === 100){
                           article.dimension.x = 30
                        }else{
                          article.dimension.x = 100
                        }
                    },
                    panier(article){
                      if(article.panier.length>0){
                           this.$panier.delete({article_id:article.panier[0].id}).then((response)=>{
                             article.panier_count--
                             article.panier = []
                           })
                      }else{
                          this.$panier.save({article_id:article.id}).then((response)=>{
                           article.panier_count++
                           article.panier = response.body
                        })
                      }
                    },
                    like(article){
                      this.$http.get('/articles/like/article/'+article.id)
                      if(article.liked_count === 1) {article.liked_count = 0; article.likes_count--; return true}
                      if(article.liked_count === 0) {article.liked_count = 1; article.likes_count++; return true}
                    },
                },
                mounted(){
                    this.$article = this.$resource(url)
                    this.$panier = this.$resource("/articles/panier{/article_id}")
                }
            }
        }
    }

export default mixin
