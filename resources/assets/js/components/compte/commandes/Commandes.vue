<template>
  <md-layout md-gutter>
      <md-layout :md-flex="15" md-column></md-layout>
      <md-layout md-column md-flex-small="100" md-flex-xsmall="100" :md-flex-medium="100">
          <div class="panier_loading" v-if="loader"></div>
          <md-table-card>
            <md-toolbar>
                <h1 class="md-title">Commandes reçues</h1>
                <md-menu>
                    <md-button class="md-icon-button" md-menu-trigger>
                        <md-icon>filter_list</md-icon>
                    </md-button>

                    <md-menu-content>
                        <md-menu-item>supprimer tous</md-menu-item>
                        <md-menu-item>ranger par</md-menu-item>
                    </md-menu-content>
                </md-menu>
            </md-toolbar>
              <md-table-alternate-header md-selected-label="selected">
                <md-button @click="openDialog('delete',item,$event)">
                  Supprimer
                  <md-icon>delete</md-icon>
                </md-button>
                <md-button class="md-raised md-primary">Confirmer</md-button>
              </md-table-alternate-header>
            <md-table md-sort="date" md-sort-type="desc">
              <md-table-header>
                  <md-table-row>
                      <md-table-head>Articles</md-table-head>
                      <md-table-head  md-sort-by="vente">Prix de ventes</md-table-head>
                      <md-table-head  md-sort-by="achat">Prix de d'achats</md-table-head>
                      <md-table-head>
                          <md-icon>message</md-icon>
                          <span>Messages</span>
                      </md-table-head>
                      <md-table-head  md-sort-by="date">Dates</md-table-head>
                  </md-table-row>
              </md-table-header>

                <md-table-body>
                    <md-table-row style="cursor: pointer;" @click.native="openModal(item)" v-for="item in commandes" :key="item.id" :md-item="item" md-selection>
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
            @pagination="onPagination">
            </md-table-pagination>
          </md-table-card>
          <modal-chat :commande="commande" :switcher="switcher"></modal-chat>
        <md-dialog-confirm
                    :md-title="'Suppression'"
                    :md-content-html="'Etes vous sur de bien vouloir supprimer cette commande?'"
                    :md-ok-text="'confirmer'"
                    :md-cancel-text="'annuler'"
                    @close="onClose"
                    ref="delete">
      </md-dialog-confirm>
      </md-layout>
     <md-layout :md-flex="15" md-column></md-layout>
  </md-layout>
</template>

<script>

    import ModalChat from "./ModalChat"
    export default{
        components:{ModalChat},
        data() {
            return {
                commandes:[],
                errors:false,
                empty:false,
                loader:false,
                user:window.user,
                commande:null,
                event:null,
                switcher: false
            }
        },
        methods:{
            onPagination(tr){
              console.log(tr)
            },
            openModal(item){
                this.commande = item
                this.switcher = !this.switcher
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
            this.$commande = this.$resource('/commandes{/id}')
            this.loadCommandes()
        }
    }

</script>

<style lang="scss" scoped>
   
</style>
