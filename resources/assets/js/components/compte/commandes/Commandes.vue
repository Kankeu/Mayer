<template>
  <md-layout md-gutter>
      <md-layout :md-flex="15" md-column></md-layout>
      <md-layout md-column md-flex-small="100" md-flex-xsmall="100" :md-flex-medium="100">
          <div class="panier_loading" v-if="loader"></div>
          <div class="alert alert-warning" v-if="empty">
              <ul>
                  <li> :( Votre panier est vide <a href="" class="pull-right">Quelques suggestions :)</a></li>
              </ul>
          </div>
          <md-layout class="grille" md-gutter v-else>
              <md-layout :md-flex="30" md-column  :md-flex-small="100" :md-flex-xsmall="100" :md-flex-medium="30" v-for="item in commandes" :key="item.id">
                  <md-tooltip md-direction="top" v-if="item.message">Double clicquez pour retourner la carte</md-tooltip>
                  <md-card md-with-hover>
                      <md-menu md-size="4" md-direction="top right" ref="menu">
                          <md-card-header>
                              <md-card-header-text md-menu-trigger>
                                  <md-avatar>
                                      <img :src="item.user.avatar">
                                  </md-avatar>
                                  <p class="md-title">{{item.article.nom}}</p>
                                  <p class="md-subhead">{{item.article.prix}}</p>
                              </md-card-header-text>
                          </md-card-header>
                          <md-menu-content>
                              <div class="author-card">
                                  <md-avatar class="md-large">
                                      <img :src="item.user.avatar">
                                  </md-avatar>
                                  <div class="author-card-info">
                                      <span>{{item.user.name|uppercase}} {{item.user.forename}}</span>
                                      <div class="author-card-links">
                                          <a href="" target="_blank" rel="noopener">{{item.user.email}}</a>
                                      </div>
                                  </div>
                              </div>
                          </md-menu-content>
                      </md-menu>
                      <div :class="item.name" @dblclick="rotate(item)">
                          <md-card-media v-if="!item.textAttached">
                              <img :src="image.path" v-for="(image, n) in item.article.images" v-show="n===0">
                          </md-card-media>
                          <div class="_message" v-else>
                              <md-card-header>
                                  <div class="md-title">Message</div>
                              </md-card-header>

                              <md-card-content>
                                  {{(item.message) ? item.message : "Pas de message attaché à cette commande."}}
                              </md-card-content>
                          </div>
                      </div>
                      <md-card-actions>
                          <md-button @click="openDialog('delete',item,$event)">Supprimer</md-button>
                          <md-button-toggle class="md-primary" @click.native="confirm(item,$event)">
                              <md-button class="md-toggle">Confirmer<md-icon v-if="item.reponse===1">done</md-icon></md-button>
                          </md-button-toggle>
                      </md-card-actions>
                  </md-card>
              </md-layout>
              <md-dialog-confirm
                      :md-title="'Suppression'"
                      :md-content-html="'Etes vous sur de bien vouloir supprimer cette commande?'"
                      :md-ok-text="'confirmer'"
                      :md-cancel-text="'annuler'"
                      @close="onClose"
                      ref="delete">
              </md-dialog-confirm>
          </md-layout>
          <md-table-card>
            <md-toolbar>
                <h1 class="md-title">Commandes reçues</h1>
                <md-button class="md-icon-button">
                    <md-icon>filter_list</md-icon>
                </md-button>

                <md-button class="md-icon-button">
                    <md-icon>search</md-icon>
                </md-button>
            </md-toolbar>
              <md-table-alternate-header md-selected-label="selected">
                <md-button class="md-icon-button">
                  <md-icon>delete</md-icon>
                </md-button>

                <md-button class="md-icon-button">
                  <md-icon>more_vert</md-icon>
                </md-button>
              </md-table-alternate-header>
            <md-table>
              <md-table-header>
                  <md-table-row>
                      <md-table-head>Articles</md-table-head>
                      <md-table-head>Prix de vente</md-table-head>
                      <md-table-head>Prix de d'achat</md-table-head>
                      <md-table-head>
                          <md-icon>message</md-icon>
                          <span>Messages</span>
                      </md-table-head>
                      <md-table-head>Dates</md-table-head>
                  </md-table-row>
              </md-table-header>

                <md-table-body>
                    <md-table-row v-for="item in commandes" :key="item.id" :md-item="item" md-auto-select md-selection>
                        <md-table-cell>{{ item.article.nom }}</md-table-cell>
                        <md-table-cell>{{ item.article.prix }}</md-table-cell>
                        <md-table-cell>{{ item.article.prix }}</md-table-cell>
                        <md-table-cell>{{ item.message }}</md-table-cell>
                        <md-table-cell v-observable.params="{callback:timerRelatif,data:item}">{{ item.created_at }}</md-table-cell>
                    </md-table-row>
                </md-table-body>
            </md-table>

            <md-table-pagination
            md-size="3"
            md-total="12"
            md-page="4"
            md-label="Lignes"
            md-separator="sur"
            :md-page-options="[12,9,6,3]"
            @pagination="onPagination"></md-table-pagination>
          </md-table-card>
      </md-layout>
     <md-layout :md-flex="15" md-column></md-layout>
  </md-layout>
</template>

<script>
    export default{
        data() {
            return {
                commandes:[],
                errors:false,
                empty:false,
                loader:false,
                user:window.user,
                commande:null,
                event:null,
                nutrition: [
                    {
                        dessert: 'Frozen yogurt',
                        type: 'ice_cream',
                        calories: '159',
                        fat: '6.0',
                        comment: 'Icy'
                    },
                    {
                        dessert: 'Ice cream sandwich',
                        type: 'ice_cream',
                        calories: '237',
                        fat: '9.0',
                        comment: 'Super Tasty'
                    },
                    {
                        dessert: 'Eclair',
                        type: 'pastry',
                        calories: '262',
                        fat: '16.0',
                        comment: ''
                    },
                    {
                        dessert: 'Cupcake',
                        type: 'pastry',
                        calories: '305',
                        fat: '3.7',
                        comment: ''
                    },
                    {
                        dessert: 'Gingerbread',
                        type: 'other',
                        calories: '356',
                        fat: '16.0',
                        comment: ''
                    }
                ],
            }
        },
        methods:{
            onPagination(tr){
              console.log(tr)
            },
            loadCommandes(){
                this.loader = true
                this.$commande.get().then(response=>{
                        response.json().then((data)=>{
                            this.page = data.next_page_url
                            this.commandes = data.data
                            console.log(this.commandes)
                            if(this.commandes.length === 0){
                                this.empty = true
                            }
                            this.loader = false
                    })
                })
            },
            confirm(item,event){
                let el = this.parentNode(event.target,"md-column")
                let data =  {reponse:true,article_id:item.article.id}
                //el.style.transition = "transform 1s, opacity 1s"
                //el.style.transform = "translate3d("+(window.innerWidth-el.getBoundingClientRect().left-el.getBoundingClientRect().width*0.2)+"px,"+(-el.getBoundingClientRect().top)+"px,0) scale(.2)"
                //el.style.opacity = 0
                this.$commande.update({id:item.id},data).then((response)=>{item.reponse=1})
                //setTimeout(()=>{this.commandes.splice(this.commandes.indexOf(item),1)},900)

            },
            remove(item,event){
                //this.$commande.delete({id:item.id})
                let el = this.parentNode(event.target,"md-column")
                el.style.transition = "transform 1s, opacity 1s"
                el.style.transform = "translate3d("+(-(window.innerWidth-el.getBoundingClientRect().left-el.getBoundingClientRect().width*0.2))+"px,"+(-el.getBoundingClientRect().top)+"px,0) scale(.2) rotate3d(0,0,1,360deg)"
                el.style.opacity = 0
                setTimeout(()=>{this.commandes.splice(this.commandes.indexOf(item),1)},900)
            },
            rotate(item){
                if(!item.textAttached){
                    item.name = "rotate-in"
                    Vue.set(item,'textAttached',true)
                }else{
                    item.name = "rotate-out"
                    item.textAttached = false
                }
            },
            openDialog(ref,item,event) {
                this.commande = item
                this.event = event
                this.$refs[ref].open();
            },
            closeDialog(ref) {
                this.$refs[ref].close();
            },
            onClose(type) {
                if(type === 'ok'){
                    this.remove(this.commande,this.event)
                }
            },
        },
        mounted (){
            Echo.channel('channel-commande'+user.id).listen('CommandeEvent', (e)=>{
               this.commandes.unshift(e.commande.commande)
            })
            this.$commande = this.$resource('/articles/commandes{/id}')
            this.loadCommandes()
        }
    }

</script>

<style lang="scss" scoped>
    *{
        font-size: 16px;
    }
    .md-card .md-card-media-cover{
        position: initial;
    }
    ._message{
        transform: rotate3d(0,1,0,180deg);
    }
    ._message .md-card-content{
        overflow-x: hidden;
        overflow-y: auto;
        word-wrap: break-word;
        word-break: break-word;
    }
    .panier_loading{
        position: fixed;
        box-sizing: border-box;
        z-index: 2;
        top: 50%;
        left: 50%;
        width: 40px;
        height: 40px;
        padding: 10px;
        margin-left: -20px;
        margin-top: -20px;
        background-color: rgba(#000, 0.5);
        border-radius: 40px;
    &:after {
         content: '';
         display: block;
         width: 20px;
         height: 20px;
         background-color: #fff;
         border-radius: 20px;
         animation: panier-loading 0.3s ease infinite;
     }
    }
    @keyframes panier-loading {
        0% {
            opacity: 0.5;
            transform: scale(0.75);
        }
        50% {
            opacity: 1;
            transform: scale(1);
        }
        100% {
            opacity: 0.5;
            transform: scale(0.75);
        }
    }
    .md-card{
        overflow: hidden;
    }
    .md-title{
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .menu{
        position: fixed;
        right: 0px;
        top:30%;
        width: 80px;
    }
    .menu ul{
        position: absolute;
        height:100%;
        display: flex;
        justify-content: space-between;
        flex-flow: column;
        padding:15px;
    }
    .menu ul li label{
        transition: transform 0.3s;
        padding: 15px;
        border-radius: 4px;
        background-color: rgba(255, 193, 18,0.5);
    }
    .menu ul li label:hover{
        transform : scale(1.2);
        background-color: rgba(255, 193, 18, 1);
    }
    .rotate-in{
        transform: rotate3d(0,1,0,180deg);
        transition: transform 1s;
    }
    .card-message{
        transform: rotate3d(0,1,0,180deg);
    }
    .card-message .md-card-header{
        padding-top: 5px;
        padding-bottom: 5px;
    }
    .md-card-content{
        word-wrap: break-word;
        overflow-y: auto;
        overflow-x: hidden;
      }
    .rotate-out{
        transform: rotate3d(0,1,0,0deg);
        transition: transform 1s;
    }
    .grille{
        justify-content: space-around;
    }
    .article{
        margin-bottom: 10px;
    }
    .md-column{
        margin-bottom: 10px;
    }
</style>
