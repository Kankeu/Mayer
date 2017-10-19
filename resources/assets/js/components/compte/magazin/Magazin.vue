<template>
    <md-layout md-gutter>
        <md-layout :md-flex="10" md-column></md-layout>
        <md-layout md-column  :md-flex-xsmall="100" :md-flex-small="100" :md-flex-medium="100">
            <div class="menu">
                <md-speed-dial style="position:fixed;" md-open="hover" md-direction="top" class="md-fab-bottom-left" md-theme="light-blue">
                    <md-button class="md-fab btn-table" md-fab-trigger @click="$refs['dialog_table'].open()">
                        <md-icon>add</md-icon>
                    </md-button>

                    <md-button class="md-fab md-primary md-mini md-clean"  @click="removeLignes">
                        <md-tooltip md-direction="right">Vider le tableau.</md-tooltip>
                        <md-icon>delete</md-icon>
                    </md-button>

                    <md-button class="md-fab md-primary md-mini md-clean" @click="sendAll">
                        <md-tooltip md-direction="right">Publier tous les articles.</md-tooltip>
                        <md-icon>send</md-icon>
                    </md-button>

                    <label class="md-button md-fab md-primary md-mini md-clean">
                        <input type="file" @change="ligneWithprev" accept="image/*" multiple>
                        <md-tooltip md-direction="right">Inserer un Plusieur images.</md-tooltip>
                        <md-icon>insert_drive_file</md-icon>
                    </label>
                </md-speed-dial>
            </div>
            <div class="table">
                <formulaire></formulaire>
            </div>
            <md-dialog md-open-from=".btn-table" md-close-to=".btn-table"  ref="dialog_table">
                <md-dialog-title>Génerer un tableau</md-dialog-title>
                <md-dialog-content>
                    <md-input-container>
                        <label>Lignes</label>
                        <md-input v-model="nombre" @keypress.native.prevent.13="createLignes"></md-input>
                    </md-input-container>
                </md-dialog-content>

                <md-dialog-actions>
                    <md-button class="md-primary" @click="$refs['dialog_table'].close()">Annuler</md-button>
                    <md-button class="md-primary" @click="createLignes">Creer</md-button>
                </md-dialog-actions>
            </md-dialog>
        </md-layout>
        <md-layout :md-flex="10" md-column></md-layout>
    </md-layout>
</template>

<script>
import formulaire from './Formulaire.vue'
import store from './magazinStore'

export default {
    components:{formulaire},
    data(){
        return{
            store:store.state,
            lignesVide:null,
            nombre:null,
        }
    },
    methods: {
        ligneWithprev(event){
            store.setImages(event.target.files)
        },
        addLigne(){
            store.addLigne(1)
        },
        preview(event, id, ligne){
            store.removeImage(id)
            ligne.photos.splice(0, ligne.photos.length)
            Object.keys(event.target.files).map((e)=>{ligne.photos.push(URL.createObjectURL(event.target.files[e]))})
        },
        removeLignes(){
            store.removeImages()
            store.removeLignes()
        },
        createLignes(){
            this.$refs['dialog_table'].close()
            if(Number(this.nombre) && this.nombre<=100) store.addLigne(this.nombre)
            event.target.value = null
        },
        sendAll(){
            $('.ligne').each(function () {
                $(this).find('button[type=submit]').click()
            })
        },
    },
}

</script>

<style scoped>
    .md-fab{
        background-color: yellow;
    }
    .block-field{
        position: fixed;
        width: 62.5%;
        z-index: 1;
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
    .md-icon{
          font-size: 24px;
    }
    .menu ul li label:hover{
      transform : scale(1.2);
      background-color: rgba(255, 193, 18, 1);
    }
    input[type=file]{
         display:none
     }
    *{
        font-size: 16px;
    }
</style>
