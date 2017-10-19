 <template>
 <div @click="close">
    <md-sidenav class="md-left md-fixed" ref="sidebar" md-swipeable>
         <md-toolbar class="md-account-header">
             <md-list class="md-transparent">
                 <md-list-item class="md-avatar-list">
                     <md-avatar class="md-large">
                         <img :src="user.avatar">
                     </md-avatar>
                 </md-list-item>

                 <md-list-item>
                     <div class="md-list-text-container">
                         <span>{{user.name}} {{user.forename}}</span>
                         <span>{{user.email}}</span>
                     </div>
                 </md-list-item>
             </md-list>
         </md-toolbar>

         <md-list>
             <md-list-item @click.native="$refs.sidebar.toggle()">
                <router-link :to="{name:'HOME'}">Home</router-link>
             </md-list-item>
             <md-list-item @click.native="$refs.sidebar.toggle()">
                 <router-link :to="{name: 'MAGAZIN'}">Mon magazin</router-link>
             </md-list-item>
             <md-list-item @click.native="$refs.sidebar.toggle()">
                 <router-link :to="{name:'PANIER'}">Panier <span class="glyphicon glyphicon-shopping-cart"></span></router-link>
             </md-list-item>
             <md-list-item @click.native="$refs.sidebar.toggle()">
                 <router-link :to="{name:'COMMANDES'}">Commandes <span class="glyphicon glyphicon-envelope"></span></router-link>
             </md-list-item>
             <md-list-item @click.native="$refs.sidebar.toggle()">
               <router-link :to="{name:'BOUTIQUE'}">Ma boutique</router-link>
             </md-list-item>
         </md-list>
     </md-sidenav>

     <md-whiteframe md-elevation="3">
         <md-toolbar>
             <div class="md-toolbar-container">
                 <md-button class="md-icon-button"  @click="$refs.sidebar.toggle()">
                     <md-icon>menu</md-icon>
                 </md-button>
                 <h2 class="md-title">{{$route.name}}</h2>
                 <div class="search-block">
                     <md-input-container style="align-items: baseline;">
                         <label>Que cherchez vous?</label>
                         <md-input type="search" v-model="cles" @click.native.stop @keyup.native="search"></md-input>
                         <md-icon>search</md-icon>
                     </md-input-container>
                     <md-list v-if="autocomplete">
                         <md-list-item v-for="item,index in autocomplete" v-if="index<5" @click.stop="select(item.nom)">
                             <span>{{item.nom}}</span>
                             <md-button class="md-icon-button"  @click.stop="remove(index)"><md-icon>close</md-icon></md-button>
                         </md-list-item>
                     </md-list>
                 </div>
             </div>
         </md-toolbar>
     </md-whiteframe>
     <main id="main-content">
         <notifications :position="' right'" :duration="300000"></notifications>
         <transition name="bounce" mode="out-in">
             <router-view></router-view>
         </transition>
         <vue-progress-bar></vue-progress-bar>
     </main>
</div>
</template>

<script>

    export default{
        data(){
            return {
                user:window.user,
                cles: null,
                autocomplete: null,
                prevCles: [],
            }
        },
        methods: {
            search (event){
                let cles = event.target.value.trim()
                if(event.keyCode === 13 && cles !== this.prevCles[0]){
                    if(cles.length > 0) {
                        this.$http.get('/articles/search/'+cles).then((reponse) => {
                            reponse.json().then((data) => {
                                this.prevCles[0] = cles
                            })
                        })
                    }
                }else{
                    if(cles.length > 2 && cles !== this.prevCles[1]){
                        this.$http.get('/articles/autocomplete/'+cles).then((reponse) => {
                            reponse.json().then((data)=>{
                                this.prevCles[1] = cles
                                let autocomplete = []
                                data.map(item => autocomplete.push(item._source))
                                this.autocomplete = (autocomplete.length > 0) ? autocomplete : null
                            })
                        })
                    }
                }
            },
            remove (index){
                this.autocomplete.splice(index,1)
            },
            select (nom){
                this.cles = nom
                this.autocomplete = null
            },
            close (){
                this.autocomplete = null
            }
        },
        watch: {
            cles (data){
                if(data.trim().length === 0){
                    this.loadClonearticle()
                }
              }
            },
            mounted: function mounted() {
              Echo.private('channel.commande.'+this.user.id).listen('CommandeEvent', (e)=>{
                    this.$notify({
                        title: "Commande",
                        type: 'warning',
                        text: e.commande.message
                    })
             })
          },
    }
</script>


<style lang="scss" scoped>
.search-block{
  font-family: monospace;
}
.md-whiteframe {
    position: fixed;
    margin-top: -70px;
    width: 100%;
    z-index: 10;
}
.md-input-container input{
    font-family: monospace;
}
.md-fab {
    margin: 0;
    position: absolute;
    bottom: -20px;
    left: 16px;
    z-index: 10;
}
.md-icon {
    color: #fff;
}


.md-title {
    padding-left: 8px;
    color: #fff;
}

#main-content {
    position: relative;
    z-index: 1;
    margin-top: 70px;
}
.md-list-action .md-icon {
    color: rgba(#000, .26);
}
.md-avatar-icon .md-icon {
    color: #fff !important;
}
.md-sidenav .md-list-text-container > :nth-child(2) {
    color: rgba(#fff, .54);
}
.md-list-item:hover .md-button:hover {
    background-color: inherit;
}
.search-block{
    position: absolute;
    top: 10px;
    right: 5%;
    min-width: 500px;
}
.md-avatar-list .md-list-item-container:hover {
    background: none !important;
}
.bounce-enter-active {
    animation: bounce-in 0.5s;
}
.bounce-leave-active {
    animation: bounce-out 0.5s;
}
@keyframes bounce-in {
    0% {
        transform: scale(0);
    }
    50% {
        transform: scale(1.5);
    }
    100% {
        transform: scale(1);
    }
}
@keyframes bounce-out {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.5);
    }
    100% {
        transform: scale(0);
    }
}
</style>
