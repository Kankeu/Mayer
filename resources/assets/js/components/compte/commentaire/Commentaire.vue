<template>
  <transition name="translateY">
    <div class="comment" v-if="open" :key="open">
      <div v-if="empty">
            <ul>
                <li>:)&nbsp;&nbsp;Soyez le premier à commenter cette article.</li>
            </ul>
        </div>
          <md-input-container>
            <label>Commentaire</label>
            <md-textarea v-model="message"  @keyup.native.13= "saveComments()" class="comment-textarea"></md-textarea>
        </md-input-container>
        <md-list class="custom-list md-triple-line">
            <div v-for="(commentaire,index) in commentaires">
                <div :class="'not-visible comments md-list-item '+margin" :key="commentaire.id"  v-observable="'not-visible'">
                    <div class="md-list-item-container">
                        <div class="_md-list-item-container">
                            <md-avatar>
                                <img :src="commentaire.user.avatar" alt="People">
                            </md-avatar>

                            <div class="md-list-text-container">
                                <span><b>{{commentaire.user.name|uppercase}} {{commentaire.user.forename}}</b></span>

                                <p class="">{{commentaire.commentaire}}</p>
                            </div>
                            <md-button class="md-icon-button md-list-action" :class="check(commentaire.liked)" @click="like(commentaire)">
                                <md-icon>favorite_border</md-icon>
                            </md-button>
                        </div>
                        <div class="_md-list-item-container attrCmt">
                            <span>{{pluriel(commentaire.likes_count,"j'aime")}}</span>
                            &nbsp;&nbsp;
                            <span>{{pluriel(commentaire.reponses_count,"réponse")}}</span>
                            &nbsp;&nbsp;
                            <span><small v-observable.params="{callback:timerRelatif,data:commentaire}">{{commentaire.created_at}}</small></span>
                            <md-button v-if="user.id === commentaire.user.id" @click.prevent="supprimer(commentaire,index,null,$event)">
                                <span>Supprimer</span> <md-icon>delete</md-icon>
                            </md-button>
                            <md-button @click.prevent="retour(commentaire)" v-if="commentaire.reply">
                                <md-icon>chevron_left</md-icon> <span>Retour</span>
                            </md-button>
                            <md-button @click.prevent="loadResponses(commentaire)" v-else>
                                <span>Répondre</span> <md-icon>comment</md-icon>
                            </md-button>
                        </div>
                        <md-divider class="md-inset"></md-divider>
                    </div>
                </div>

                <div  class="not-visible comments md-list-item comment-repondre-block" v-if="!repondre_id && commentaire.previewsreponse"  v-observable="'not-visible'">
                    <div class="md-list-item-container">
                        <div class="_md-list-item-container">
                            <md-avatar>
                                <img :src="commentaire.previewsreponse.user.avatar" alt="People">
                            </md-avatar>

                            <div class="md-list-text-container">
                                <span><b>{{commentaire.previewsreponse.user.name|uppercase}} {{commentaire.previewsreponse.user.forename}}</b></span>
                                <p>{{commentaire.previewsreponse.commentaire}}</p>
                            </div>

                            <md-button class="md-icon-button md-list-action" :class="check(commentaire.previewsreponse.liked)" @click="like(commentaire.previewsreponse)">
                                <md-icon>favorite_border</md-icon>
                            </md-button>
                        </div>
                        <div class="_md-list-item-container attrCmt">
                            <span>{{pluriel(commentaire.previewsreponse.likes_count,"j'aime")}}</span>
                            &nbsp;&nbsp;
                            <span><small v-observable.params="{callback:timerRelatif,data:commentaire.previewsreponse}">{{commentaire.previewsreponse.created_at}}</small></span>
                            <md-button v-if="user.id === commentaire.previewsreponse.user.id" @click.prevent="supprimer(commentaire.previewsreponse,index,null,$event)">
                                <span>Supprimer</span> <md-icon>delete</md-icon>
                            </md-button>
                        </div>
                        <md-divider class="md-inset"></md-divider>
                    </div>
                </div>

                <div class="not-visible comments md-list-item comment-repondre-block" v-for="(reponse,indexRep) in commentaire.reponses" v-if="repondre_id" :key="reponse.id" v-observable="'not-visible'">
                    <div class="md-list-item-container">
                        <div class="_md-list-item-container">
                            <md-avatar>
                                <img :src="reponse.user.avatar" alt="People">
                            </md-avatar>

                            <div class="md-list-text-container">
                                <span><b>{{reponse.user.name|uppercase}} {{reponse.user.forename}}</b></span>
                                <p>{{reponse.commentaire}}</p>
                            </div>
                            <md-button class="md-icon-button md-list-action" :class="check(reponse.liked)" @click="like(reponse)">
                                <md-icon>favorite_border</md-icon>
                            </md-button>
                        </div>
                        <div class="_md-list-item-container attrCmt">
                            <span>{{pluriel(reponse.likes_count,"j'aime")}}</span>
                            &nbsp;&nbsp;
                            <span><small v-observable.params="{callback:timerRelatif,data:reponse}">{{reponse.created_at}}</small></span>
                            <md-button v-if="user.id === reponse.user.id" @click.prevent="supprimer(reponse,index,null,$event)">
                                <span>Supprimer</span> <md-icon>delete</md-icon>
                            </md-button>
                        </div>

                        <md-divider class="md-inset"></md-divider>
                    </div>
                </div>
            </div>
        </md-list>
            <div class="alert alert-info" v-if="nextUrl">
                <ul>
                    <li class="text-left">Ces commentaires vous interessent ?   :) <a class="pull-right btn_lire" @click="loadMore()">Lire plus</a></li>
                </ul>
            </div>
            <div class="loader" v-if="loading"><md-spinner md-indeterminate class="spinner"></md-spinner></div>
        </div>
      </transition>
</template>


<script>

    export default {
        props: {
            open: Boolean,
            margin: {type: Boolean,default: "margin"},
            article: Object,
        },
        data () {
            return {
                message:null,
                commentaires:[],
                repondre_id:null,
                loading: true,
                nextUrl: null,
                empty: false,
            }
        },
        methods: {
            loadComments (){
              this.loading = true
              this.$commentaire.get().then(response=>{
                  if(response.body.data && response.body.data.length>0) {
                    this.commentaires = _.cloneDeep(response.body.data)
                    if(response.body.next_page_url) this.nextUrl = response.body.next_page_url
                  }
                    this.loading = false
                    this.$el.querySelector('textarea').focus()
              })
            },
            loadResponses(commentaire){
              this.loading=true
              this.repondre_id = commentaire.id
              commentaire.reply = true
              this.$el.querySelector('textarea').focus()
              this.commentaires =  [commentaire]
              this.$http.get( '/comments/'+this.article.id+'/'+commentaire.id).then(response=>{
                  if(response.body && response.body.length>0) {
                        commentaire.reponses = [..._.cloneDeep(response.body)]
                        this.commentaires =  [commentaire]
                  }
                  this.loading = false

              })
            },
            loadMore(){
              this.loading=true
              let url = (this.nextUrl) ? this.nextUrl.replace("http://localhost:8000","") : null
              if(url){
                this.$http.get(url).then(response=>{
                    if(response.body.data && response.body.data.length>0){
                       this.commentaires.push(..._.cloneDeep(response.body.data))
                       this.nextUrl = response.body.next_page_url
                     }
                    this.loading = false
                })
              }
            },
            saveComments () {
              this.$commentaire.save({'commentaire':this.message,'article_id':this.article.id,'parent_id':this.repondre_id}).then(response=>{
                  if(response.body && response.body.length>0){
                    let data = _.cloneDeep(response.body)
                    data[0].user = user
                    if(data[0].parent_id === null)
                    {
                        this.commentaires.push(data[0])
                        this.article.commentaires_count++
                    }else {
                        let parent = this.commentaires.filter((comment) => {
                            return (comment.id === data[0].parent_id) ? comment : null
                        });
                        parent[0].reponses.push(data[0])
                        parent[0].reponses_count++
                    }
                    this.$nextTick(() => {
                       this.$el.querySelector('.md-list').scrollTop =  this.$el.querySelector('.md-list').scrollHeight + 1000
                    })
               }
              })
              this.message = null
            },
            retour(){
              this.repondre_id = null
              this.loadComments()
              this.$el.querySelector('textarea').focus()
            },
            supprimer(commentaire,index,index_rep,event) {
              this.parentNode(event.target,'md-list-item').classList.add('not-visible')
                let clear =setTimeout(()=>{
                  this.$commentaire.delete({id:commentaire.id})
                  if(!commentaire.parent_id)
                  {
                      this.commentaires.splice(index,1)
                      this.article.commentaires_count--
                      if(this.repondre_id) this.retour()
                  }else{
                      this.commentaires[index].reponses.splice(index_rep,1)
                      this.commentaires[index].reponses_count--
                  }
                },400)
            },
            like (commentaire) {
                this.$http.get("/like/commentaire/"+commentaire.id)
                if(commentaire.liked === 1) {commentaire.liked = 0; commentaire.likes_count--; return true}
                if(commentaire.liked === 0) {commentaire.liked = 1; commentaire.likes_count++; return true}
            },
        },
        mounted(){
            console.log(this.article)
          this.$commentaire = this.$resource('/comments/'+this.article.id+'{/id}')
        },
        watch: {
            open(data){
                console.log("dfsdf",data)
                if(data===true){
                    this.loadComments()
                }else{
                    this.repondre_id = null
                }
            },
            commentaire(data){
                if(data.length===0) this.empty = true
            }
           
        }
    }
</script>

<style scoped lang="scss">
.text-ellipse{
  text-overflow: ellipsis !important;
  overflow: hidden !important;
  word-wrap: initial !important;
}
.wBreack{
    word-wrap: break-word !important;
}
.comments{
  transform: translateX(0);
  opacity: 1;
  transition: transform .4s, opacity .4s;
}
.md-list{
    max-height:600px;
    overflow-y:auto;
    overflow-x: hidden;
}
.not-visible{
  transform: translateX(50px) !important;
  opacity: 0!important;
}
.comment-blockquote-previewsreponse{
  margin-left: 25px;
}
.translateX-enter-active {
    position: absolute;
    animation: translateX-in 1s;
}
.translateX-leave {
    position: absolute;
    animation: translateX-in 1s reverse;
}
@keyframes translateX-in {
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(0);
  }
}
.attrCmt{
    justify-content: flex-end;
    align-items: baseline;
    flex-wrap: wrap;
}
._md-list-item-container{
    display:flex !important;
}
.md-list-item-container{
    display:block !important;
}
.md-icon{
  color: rgba(0, 0, 0, .54);
}
.pull-right{
  float: right;
}
.check .md-icon
{
    color: #2196f3
}
.translateY-enter-active {
  animation: translateY-in 1s;
}
.translateY-leave-active {
  animation: translateY-in 1s reverse;
}
@keyframes translateY-in {
  0% {
    max-height: 0;
    transform: max-height;
  }
  100% {
    max-height: 550px;
    transform: max-height;
  }
}
.loader{
  width: 100%;
  display:flex;
  flex-direction: column;
  align-items: center;
}
.margin{
    margin-top: 10px;
}
  .comment{
        overflow: hidden;
        height: auto;
        background-color: white;
        position: relative;
        margin-bottom: 10px;
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12);
        border-radius: 2px;
        &:hover{
             box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.3);
             transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
             transition-property: box-shadow;
             transition-duration: 0.4s;
             transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
             transition-delay: initial;
             transition-property: box-shadow;
         }
    }
    .alertCmt{
        width: 100%;
        height: 100%;
        margin-bottom: 0;
    }
    .comment-repondre-block{
        margin-left: 25px;
        margin-bottom:10px;
        margin-top:10px;
    }
    .md-list-text-container > :nth-child(2), .md-list-text-container > :nth-child(3){
        color:black;
    }
    blockquote{
        position: relative;
    }
    .comment-blockquote{
             margin: 0;
             padding: 0;
             border: none;
             font-size: 17px;
         }
    .comment-blockquote-reponse{
        padding-right: 0;
        font-size: 17px;
    }
    .comment-content{
        display:flex;
        word-wrap: break-word;

    }
    .comment-head{
        width: 50px;
        background:white;
    }
    .comment-photo{
        width:50px;
        height: 50px;
        margin-right:5px;
        background:white;
    }
    .comment-body{
        word-wrap: break-word;
        max-width : 95%;
        max-height: 500px;
        overflow:auto;
        padding-left:5px;
        padding-right:5px;
    }
    .comment-btn-repondre{
        margin-right:10px;
        cursor:pointer;
    }
    .comment-like{
        background:tranparent;
    }
    .comment-textarea{
        font-size: 17px;
    }
    .md-input-container{
        margin-bottom: 1px;
    }
    .repondreCmt{
        color : red;
    }
    .alert{
        border-radius: 0;
    }
    .btn_lire{
        font-size: 16px;
        cursor: pointer;
    }
    .card{
        width:auto
    }
    small{
        display : inline-block;
    }
    .md-list-text-container p { 
        text-overflow: initial !important;
        word-wrap: break-word !important;
        white-space: initial !important;
    }
</style>
