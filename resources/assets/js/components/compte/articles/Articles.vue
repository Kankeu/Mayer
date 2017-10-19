<template>
    <div>
      <md-layout class="grille" md-gutter>
        <md-layout :md-flex="(article.dimension && withResize) ? article.dimension.x:30" md-column md-flex-xsmall="100" :md-flex-medium="(article.dimension && article.dimension.x>40) ? article.dimension.x:30"  v-for="article,index in articles" :key="article.id" class="article">
                    <md-card md-with-hover>
                        <md-menu md-size="4" md-direction="top right" ref="menu" md-align-trigger>
                            <md-card-header>
                                <md-card-header-text md-menu-trigger>
                                    <md-avatar>
                                        <img :src="article.user.avatar">
                                    </md-avatar>
                                    <p class="md-title">{{article.nom}}</p>
                                    <p class="md-subhead">{{article.prix}}&nbsp;$</p>
                                </md-card-header-text>
                                <md-menu md-size="4" md-direction="bottom left" md-align-trigger>
                                    <md-button class="md-icon-button" md-menu-trigger>
                                        <md-icon>keyboard_arrow_down</md-icon>
                                    </md-button>
                                    <md-menu-content>
                                        <md-menu-item @click="masquer(article)">
                                            <span>Masquer</span>
                                            <md-icon>hidden</md-icon>
                                        </md-menu-item>
                                        <md-menu-item v-if="user.id === article.user_id">
                                            <span>Modifier</span>
                                            <md-icon></md-icon>
                                        </md-menu-item>
                                        <md-menu-item @click="resize(article)" v-if="article.dimension && article.dimension.x === 100">
                                            <span>Réduire</span>
                                            <md-icon></md-icon>
                                        </md-menu-item>
                                        <md-menu-item @click="resize(article)" v-else>
                                            <span>Agrandir</span>
                                            <md-icon></md-icon>
                                        </md-menu-item>
                                        <md-menu-item v-if="user.id === article.user_id"  @click="openDialog('delete',article)">
                                            <span>Supprimer</span>
                                            <md-icon>delete</md-icon>
                                        </md-menu-item>
                                        <md-menu-item class="btn-dimension" v-if="user.id === article.user_id && withResize"  @click="openDialog('redimensionner',article)">
                                            <span>Redimensionner</span>
                                            <md-icon></md-icon>
                                        </md-menu-item>
                                    </md-menu-content>
                                    </md-menu-content>
                                </md-menu>
                            </md-card-header>
                            <md-menu-content>
                                <div class="author-card">
                                    <md-avatar class="md-large">
                                        <img :src="article.user.avatar">
                                    </md-avatar>

                                    <div class="author-card-info">
                                        <span>{{article.user.name|uppercase}} {{article.user.forename}}</span>
                                        <div class="author-card-links">
                                            <a href="" target="_blank" rel="noopener">{{article.user.email}}</a>
                                        </div>
                                    </div>
                                </div>
                            </md-menu-content>
                        </md-menu>
                        <md-card-media>
                            <img :src="image.path" class="images" v-for="image,i in article.images" v-show="i===0" v-img="{group:'group-'+article.id}">
                        </md-card-media>

                        <md-card-header>
                            <div class="attrArticle">
                                <div class="jaime">
                                    <span class="nombres">{{pluriel(article.likes_count, "j'aime")}}</span>
                                </div>
                                <div class="comments">
                                    <span class="nombres">{{pluriel(article.commentaires_count, "commentaire")}}</span>
                                </div>
                            </div>
                        </md-card-header>

                        <md-card-expand>
                            <md-card-actions>
                                <md-button class="md-icon-button" :class="check(article.liked)" @click.stop.prevent="like(article)">
                                    <md-icon>favorite_border</md-icon>
                                </md-button>
                                <md-button class="md-icon-button" :class="check(article.panier.length)" @click.stop.prevent="panier(article)"  v-if="user.id !== article.user_id">
                                    <md-icon>add_shopping_cart</md-icon>
                                </md-button>
                                <md-button class="md-icon-button comment-btn" :class="{cmtCheck:article.commentOpen}" @click="(article.dimension && article.dimension.x === 100) ? false : resize(article)" v-commentable="article">
                                    <md-icon>comment</md-icon>
                                </md-button>
                                <md-button class="md-icon-button">
                                    <md-icon>share</md-icon>
                                </md-button>
                                <span style="flex: 1"></span>
                                <md-button class="md-icon-button" md-expand-trigger>
                                    <md-icon>keyboard_arrow_down</md-icon>
                                </md-button>
                            </md-card-actions>
                            <md-card-content>
                                <p>
                                    {{article.description}}
                                </p>
                                <b>{{pluriel(article.panier_count,'commande')}}</b>
                                <small v-observable.params="{callback:timerRelatif,data:article}">{{article.created_at}}</small>
                            </md-card-content>
                        </md-card-expand>
                    </md-card>
                    <commentaire :article="article" :open="article.commentOpen"></commentaire>
                    <fullScreen :article="article" :open="article.commentOpen"></fullScreen>
                </md-layout>
      </md-layout>
      <md-spinner class="spinner" md-indeterminate v-see></md-spinner>
       <md-snackbar :md-position="'bottom center'" ref="snackbar" :md-duration="5000">
            <span class="red">Erreur lors du chargement des articles</span>
        </md-snackbar>
        <md-dialog-confirm
            :md-title="'Suppression'"
            :md-content-html="'Etes vous sur de bien vouloir supprimer cet article?'"
            :md-ok-text="'confirmer'"
            :md-cancel-text="'annuler'"
            @close="onClose"
            ref="delete">
       </md-dialog-confirm>
       <md-dialog md-open-from=".btn-dimension" md-close-to=".btn-dimension"  ref="redimensionner">
            <md-dialog-title>Redimensionner</md-dialog-title>

            <md-dialog-content class="position-box">
                <form v-if="article">
                    <md-input-container>
                        <label>Largeur</label>
                        <md-input v-model="article.dimension.x"></md-input>
                    </md-input-container>
                    <md-input-container>
                        <label>Hauteur</label>
                        <md-input v-model="article.dimension.y"></md-input>
                    </md-input-container>
                </form>
            </md-dialog-content>

            <md-dialog-actions>
                <md-button class="md-primary" @click="closeDialog('redimensionner')">Annuler</md-button>
                <md-button class="md-primary" @click="dimensionner">Confirmer</md-button>
            </md-dialog-actions>
        </md-dialog>
    </div>
</template>

<script>
    import commentaire from '../commentaire/Commentaire.vue'
    import fullScreen from '../commentaire/fullScreen.vue'

    export default {
        components: {commentaire,fullScreen},
        props: {
            url: String,
            withResize: Boolean
        },
        data() {
            return {
                articles: [],
                article: null,
                ready: true
            }
        },
        methods: {
            getArticles(){
                    this.$article.get().then((response)=>{
                          if(response.body && response.body.length>0) this.articles = _.cloneDeep(response.body)
                    },(error)=>{

                    })
                },
            loadMore(){
                this.ready = false
                if(!this.articles.slice().reverse()[0]) return false
                this.$article.get({id:this.articles.slice().reverse()[0].id}).then((response)=>{
                    if(response.body && response.body.length>0) this.articles = this.articles.concat(_.cloneDeep(response.body))
                    this.ready = true
                },(error)=>{
                    this.$refs.snackbar.open()
                })
            },
            setDimension({article}){
                this.$http.post('/dimension/',{article_id:article.id, x:article.dimension.x}).then((response)=>{
                    response.json().then((data)=>{

                    })
                },(error)=>{

                })
            },
            putDimension({article}){
                this.$http.put('/dimension/'+article.dimension.id,{article_id:article.id, x:article.dimension.x}).then((response)=>{
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
              this.$http.get('/like/article/'+article.id)
              if(article.liked === 1) {article.liked = 0; article.likes_count--; return true}
              if(article.liked === 0) {article.liked = 1; article.likes_count++; return true}
            },
            dimensionner()
            {
                if(this.article.dimension && this.article.dimension.id)
                {
                    this.putDimension({article: this.article,dimension:this.dimension})
                }else{
                    this.setDimension({article: this.article,dimension:this.dimension})
                }
                this.closeDialog('redimensionner')
            },
            indexArticle (index,ligne) {
                return index+(ligne*3)
            },
            openDialog(ref,article) {
                this.article = article
                this.$refs[ref].open();
            },
            closeDialog(ref) {
                this.$refs[ref].close();
            },
            onClose(type) {
                if(type === 'ok') this.removeArticle(this.article)
            },
        },
        mounted(){
            this.$article = this.$resource(this.url)
            this.$panier = this.$resource("/panier{/article_id}")
            this.getArticles()
        },
        directives: {
          see: {
            bind(el,binding,vnode){
                let observer = el.intersectionObserver = new IntersectionObserver((observables)=> {
                if(observables[0].isIntersecting && observables[0].boundingClientRect.height!==0 && observables[0].boundingClientRect.width!==0)
                    {
                        if(vnode.context.ready) vnode.context.loadMore()
                    }
                },{rootMargin: "400px"})
                vnode.context.$nextTick(() => {
                  observer.observe(el)
                })
            },
            unbind(el){
                if (el.intersectionObserver) {
                    el.intersectionObserver.disconnect()
                    delete el.intersectionObserver
                }
            }
          }
        }

    }
</script>

<style scoped>
    .md-column{
        margin-bottom: 13px;
        margin-top: 13px;
    }
    .grille{
        justify-content: space-between;
    }
    .images{
        height: 300px;
    }
    .attrArticle
    {
        font-size: 13px;
        display: flex;
        justify-content: space-between;
    }
    .article{
        margin-bottom: 10px;
        transition: flex .3s;
    }
    .md-card-content{
        display: grid;
    }
    .md-card-content p{
        max-height: 100px;
        overflow-y: auto;
        word-wrap: break-word;
    }
    .md-subhead{
        color: #2196f3;
    }
    .position-box{
        overflow: hidden;
    }
    .md-card-header-text p{
        word-wrap: break-word;
        width: 225px;
    }
    .md-spinner{
        margin-left: 48%;
    }
    .attrArticle
    {
        font-size: 13px;
        display: flex;
        justify-content: space-between;
    }
    .md-theme-default.md-card .md-card-actions .check:not(.md-primary):not(.md-warn):not(.md-accent) .md-icon
    {
        color: #2196f3;
    }
    .md-theme-default.md-card .md-card-actions .cmtCheck:not(.md-primary):not(.md-warn):not(.md-accent) .md-icon
    {
        color: #2196f3;
    }
    small {
        font-family: monospace;
    }
</style>