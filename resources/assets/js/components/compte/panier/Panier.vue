<template>
    <md-layout md-gutter>
        <md-layout :md-flex="15" md-column></md-layout>
        <md-layout md-column  :md-flex-xsmall="100" :md-flex-small="100" :md-flex-medium="100">
            <div class="panier_loading" v-if="loader"></div>
            <div class="alert alert-warning" v-if="empty">
                <ul>
                    <li> :( Votre panier est vide <a href="" class="pull-right">Quelques suggestions :)</a></li>
                </ul>
            </div>
              <md-layout class="grille" md-gutter v-else>
                <md-layout :md-flex="30" md-column  :md-flex-small="100" :md-flex-xsmall="100" :md-flex-medium="30" v-for="item in paniers" :key="item.id">
                    <md-tooltip md-direction="top">Double clicquez pour retourner la carte</md-tooltip>
                    <md-card md-with-hover>
                            <md-menu md-size="4" md-direction="top right" ref="menu" v-if="item.etat===0">
                                <md-card-header>
                                    <md-card-header-text md-menu-trigger>
                                        <md-avatar>
                                            <img :src="item.article.user.avatar">
                                        </md-avatar>
                                        <p class="md-title">{{item.article.nom}}</p>
                                        <p class="md-subhead">{{item.article.prix}}</p>
                                    </md-card-header-text>
                                </md-card-header>
                                <md-menu-content>
                                    <div class="author-card">
                                        <md-avatar class="md-large">
                                            <img :src="item.article.user.avatar">
                                        </md-avatar>

                                        <div class="author-card-info">
                                            <span>{{item.article.user.name|uppercase}} {{item.article.user.forename}}</span>
                                            <div class="author-card-links">
                                                <a href="" target="_blank" rel="noopener">{{item.article.user.email}}</a>
                                            </div>
                                        </div>
                                    </div>
                                </md-menu-content>
                            </md-menu>
                            <div :class="item.name" @dblclick="rotate(item)">
                                <md-card-media v-if="!item.textAttached">
                                    <img :src="image.path" v-for="(image, n) in item.article.images" v-show="n===0" v-if="item.etat===0">
                                    <img src="/img/img_par_default/enveloppe.jpg" v-show="item.etat===1">
                                </md-card-media>
                                <md-input-container v-else>
                                    <label>Votre message...</label>
                                    <md-textarea maxlength="150" v-model="item.message"></md-textarea>
                                </md-input-container>
                            </div>
                        <md-card-actions v-if="item.etat===0">
                            <md-button-toggle md-single class="md-primary">
                                <md-button  @click="remove(item,$event)">Retirer</md-button>
                                <md-button @click.native="confirm(item,$event)" class="md-toggle">Commander</md-button>
                            </md-button-toggle>
                        </md-card-actions>
                    </md-card>
            </md-layout>
         </md-layout>
        </md-layout>
        <md-layout :md-flex="15" md-column>
            <div class="menu">
                <ul>
                    <li class="btnAdd"><label><md-icon>send</md-icon></label></li>
                    <li class="btnRemove"><label><md-icon>delete</md-icon></label></li>
                    <li class="btnSend"><label><md-icon>add</md-icon></label></li>
                </ul>
            </div>
        </md-layout>
    </md-layout>
</template>

<script>

    export default{
        data() {
            return {
                errors:false,
                empty:false,
                loader:false,
                paniers: [],
            }
        },
        methods: {
            loadPanier(){
              this.$panier.get().then(response=>{
                if(response.body && response.body.length>0){
                   this.paniers = _.cloneDeep(response.body).sort((a,b)=>b.id-a.id)
                }else{
                  this.empty = true
                }
              })
            },
            confirm(item,event){
                let el = this.parentNode(event.target,"md-column")
                item.etat = 1
                let data = (item.message) ? {message:item.message,quantite:1,article_id:item.article.id} : {quantite:1,article_id:item.article.id}
                el.style.transition = "transform 1s, opacity 1s"
                el.style.transform = "translate3d("+(window.innerWidth-el.getBoundingClientRect().left-el.getBoundingClientRect().width*0.2)+"px,"+(-el.getBoundingClientRect().top)+"px,0) scale(.2) rotate3d(0,0,1,360deg)"
                el.style.opacity = 0
                this.$panier.update({id:item.id},data).then((response)=>{item.etat=true})
                setTimeout(()=>{this.paniers.splice(this.paniers.indexOf(item),1)},900)
            },
            remove(item,event){
                //this.$panier.delete({id:item.id})
                let el = this.parentNode(event.target,"md-column")
                el.style.transition = "transform 1s, opacity 1s"
                el.style.transform = "translate3d("+(-(window.innerWidth-el.getBoundingClientRect().left-el.getBoundingClientRect().width*0.2))+"px,"+(-el.getBoundingClientRect().top)+"px,0) scale(.2) rotate3d(0,0,1,360deg)"
                el.style.opacity = .5
                el.style.opacity = 0
                setTimeout(()=>{this.paniers.splice(this.paniers.indexOf(item),1)},900)
            },
            rotate(item){
              if(!item.textAttached){
                item.name = "rotate-in"
                Vue.set(item,'textAttached',true)
              }else{
                item.name = "rotate-out"
                item.textAttached = false
              }
            }
        },
        mounted (){
          this.$panier = this.$resource('/articles/panier{/id}')
          this.loadPanier()
        }
    }
</script>

<style lang="scss" scoped>
    *{
        font-size: 16px;
    }
    .md-title{
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .md-card{
        overflow: hidden;
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
    .md-input-container{
        transform: rotate3d(0,1,0,180deg);
    }
    .md-input-container textarea{
        overflow-y: auto !important;
        height: 120px !important;
    }
    .rotate-out{
        transform: rotate3d(0,1,0,0deg);
        transition: transform 1s;
    }
    .grille{
        justify-content: space-around;
        align-items:baseline;
    }
    .article{
        margin-bottom: 10px;
    }
    .md-column{
        margin-bottom: 10px;
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
</style>
