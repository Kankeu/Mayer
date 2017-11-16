<template>
<div v-show="open">
  <md-dialog ref="commandeModal" @open="open=true" @close="open=false">
    <md-dialog-actions>
        <md-button class="md-primary" @click="$refs['commandeModal'].close()">X</md-button>
    </md-dialog-actions>
    <md-dialog-title v-if="commande" class="absolute">Commande de <a href="#">{{commande.user.name}} {{commande.user.forename}}</a></md-dialog-title>
    <md-dialog-content v-if="commande" style="overflow:hidden">
        <md-layout md-gutter>
            <md-layout md-flex="50" class="block">
            <md-card>
                <md-card-media>
                    <img :src="commande.article.images[0].path">
                </md-card-media>
                <md-card-content style="height:70px">
                    {{commande.message}}
                </md-card-content>
                <md-card-actions>
                    <md-button  @click="openDialog('delete',commande,$event)">Supprimer</md-button>
                    <md-button class="md-primary md-raised"  @click.native="confirm(commande,$event)">Confirmer<md-icon v-if="commande.reponse===1">done</md-icon></md-button>
                </md-card-actions>
            </md-card>
            </md-layout>  
            <md-layout md-flex="50" class="block">
                <md-list class="custom-list md-triple-line" style="overflow-y:auto;height:484.33px;width:100%">
                    <md-list-item v-for="n,i in 5" :key="i">
                    <md-avatar>
                        <img :src="user.avatar" alt="People">
                    </md-avatar>

                    <div class="md-list-text-container">
                        <span>Vous</span>
                        <p>I'll be in your neighborhood doing errands...</p>
                    </div>

                    <md-divider class="md-inset"></md-divider>
                    </md-list-item>

                    <md-list-item v-for="n,i in 5" :key="i">
                    <md-avatar>
                        <img :src="commande.user.avatar" alt="People">
                    </md-avatar>

                    <div class="md-list-text-container">
                        <span>{{commande.user.name}} {{commande.user.forename}}</span>
                        <p>Wish I could come, but I'm out of town ...</p>
                    </div>

                    <md-divider class="md-inset"></md-divider>
                    </md-list-item>
                </md-list>                         
                <md-input-container class="marginL">
                    <label>Message</label>
                    <md-textarea></md-textarea>
                </md-input-container>  
            </md-layout>  
        </md-layout>
    </md-dialog-content>
  </md-dialog>
    <span  class="prev-v-img">
        <svg width="25" height="25" viewBox="0 0 1792 1915"><path d="M1664 896v128q0 53-32.5 90.5t-84.5 37.5h-704l293 294q38 36 38 90t-38 90l-75 76q-37 37-90 37-52 0-91-37l-651-652q-37-37-37-90 0-52 37-91l651-650q38-38 91-38 52 0 90 38l75 74q38 38 38 91t-38 91l-293 293h704q52 0 84.5 37.5t32.5 90.5z" fill="#fff"/></svg>
    </span>
    <span class="next-v-img">
        <svg width="25" height="25" viewBox="0 0 1792 1915"><path d="M1600 960q0 54-37 91l-651 651q-39 37-91 37-51 0-90-37l-75-75q-38-38-38-91t38-91l293-293h-704q-52 0-84.5-37.5t-32.5-90.5v-128q0-53 32.5-90.5t84.5-37.5h704l-293-294q-38-36-38-90t38-90l75-75q38-38 90-38 53 0 91 38l651 651q37 35 37 90z" fill="#fff"/></svg>
    </span>
</div>
</template>

<script>
export default {
  props:{
      commande: Object,
      switcher: Boolean,
  },
  data(){
      return {
          open:null
      }
  },
  watch:{
      switcher(data){
        this.$refs['commandeModal'].open()
      }
  }
}
</script>

<style scoped>
    .block{
        display: block;
    }
    .absolute{
        position: absolute;
    }
    .marginL{
        margin-left: 16px;
    }

    .md-card .md-card-media-cover{
        position: initial;
    }
        .prev-v-img svg,
    .next-v-img svg {
        margin: 5px auto;
    }
    .prev-v-img,
    .next-v-img {
        color: white;
        width: 35px;
        height: 35px;
        position: absolute;
        top: 50%;
        margin-top: -100px;
        font-size: 15px;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        text-align: center;
        background-color: rgba(0, 0, 0, .3);
        z-index: 10006;
        opacity: .3;
        -webkit-transition: opacity .3s ease-in-out;
        transition: opacity .3s ease-in-out;
        cursor: pointer;
    }

    .prev-v-img:hover,
    .next-v-img:hover {
        opacity: 1;
    }
    .prev-v-img {
        left: 10px;
    }

    .next-v-img {
        right: 10px;
    }
</style>

