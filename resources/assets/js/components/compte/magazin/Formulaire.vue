<template>
    <div style="display: flex;justify-content: center">
        <md-table style="background:#fff;width: 100%" v-if="lignes.length>0">
            <md-table-header>
                <md-table-row>
                    <md-table-head>Inserer</md-table-head>
                    <md-table-head>Photo(s)</md-table-head>
                    <md-table-head>Nom</md-table-head>
                    <md-table-head>Prix</md-table-head>
                    <md-table-head>Description</md-table-head>
                    <md-table-head>Publier</md-table-head>
                </md-table-row>
            </md-table-header>

            <md-table-body>
                <form class="md-table-row" style="display: table-row;position: relative"  v-for="(ligne,index) in lignes" @dblclick="remove($event, index, ligne.id)" @submit.prevent="publier($event, ligne.id)">
                    <md-table-cell><label class="md-button md-button-icon md-theme-default _md-button"><md-icon>insert_drive_file</md-icon><input type="file" name="photos[]"  @change="preview($event, ligne.id, ligne)"  accept="image/*" multiple></label></md-table-cell>
                    <md-table-cell>
                        <div v-for="(photo, indexPo) in ligne.photos" v-show="indexPo===0" class="block-img"><div class="nbr-photos">{{ligne.photos.length}}</div><img v-img="{group:'groupe-'+index}" :src="photo"></div>
                    </md-table-cell>
                    <md-table-cell>
                        <md-input-container>
                            <label>nom</label>
                            <md-textarea name="nom" required></md-textarea>
                        </md-input-container>
                    </md-table-cell>
                    <md-table-cell>
                        <md-input-container>
                            <label>Prix</label>
                            <md-textarea name="prix" required></md-textarea>
                        </md-input-container>
                    </md-table-cell>
                    <md-table-cell>
                        <md-input-container>
                            <label>Description</label>
                            <md-textarea name="description" required></md-textarea>
                        </md-input-container>
                    </md-table-cell>
                    <md-table-cell><md-button type="submit" class="md-button-icon _md-button"><md-icon>send</md-icon></md-button></md-table-cell>
                    <div style="display: flex;justify-content: flex-end;position: absolute;left: 0;width: 100%;"><div style="width:100%;display: flex;justify-content: center;"><md-progress :md-progress="100" style="width: 80%;"></md-progress></div></div>
                </form>
            </md-table-body>
        </md-table>
    </div>
</template>

<script>
    import store from './magazinStore'
    import {mapActions} from 'vuex'

    export default{
        data(){
            return{
                lignes: store.state.lignes,
            }
        },
        methods:{
            ...mapActions('MagazinStore',['add_article']),
            preview(event, id, ligne){
                store.removeImage(id)
                ligne.photos.splice(0, ligne.photos.length)
                Object.keys(event.target.files).map((e)=>{ligne.photos.push(URL.createObjectURL(event.target.files[e]))})
            },
            remove(event, index,id){
                $(event.target).parents('form').slideUp(500, () => {
                    store.removeImage(id)
                    store.removeLigne(index)
                })
            },
            publier(event, id){
                let $form = $(event.target)
                let formdata = new FormData(event.target)
                if(formdata.getAll('photos[]')[0].size === 0 && store.getImage(id).length !== 0){
                    formdata.delete('photos[]')
                    formdata.append('photos[]', store.getImage(id)[0].file)
                }
                let request = new XMLHttpRequest()
                request.upload.addEventListener('progress',function(e){
                    let percent = Math.round(e.loaded/e.total*100)
                    $form.find('.progress').attr('style','display:block;')
                    $form.find('.progress-bar').width(percent+'%').html(percent+'%')
                });
                request.onreadystatechange = ()=>{
                    if(request.readyState === 4){
                        if(request.status === 200){
                            if(JSON.parse(request.response)){
                                $form.find('button').attr('disabled','disabled').addClass('glyphicon glyphicon-ok').text('')
                                this.add_article({article:JSON.parse(request.response), images:formdata.getAll('photos[]')})
                            }
                        }
                    }
                }
                request.open('post','/articles')
                request.setRequestHeader('X-CSRF-TOKEN', window.Laravel.csrfToken)
                request.send(formdata)
            }
        }
    }
</script>

<style lang="scss" scoped>
    ._md-button{
        background-color: transparent !important;
    }
    .md-table-row{
        border-top: none !important;
    }
    input[type=file]{
        display:none
    }
    .ligne{
        margin-bottom: 10px;
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    .ligne label,img,textarea,button{
        height:150px;
        width: auto;
    }
    .ligne div label{
        line-height: 140px;
    }
    .nbr-photos{
        position:absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .4);
        text-align: center;
        padding-top: 35%;
        color: #fff;
        border-radius: 4px;
        font-size: 18px;
    }
    .block-img{
        position: relative;
        width: 200px;
        &:hover .nbr-photos{
            display: none;
        }
    }
    .btn{
        cursor: pointer;
    }
    *{
        font-size: 16px;
    }
    img{
        width: 200px;
    }
    .progress{
        width: 100%;
        display: none;
    }
    .form-slide-enter-active, .form-slide-leave-active{
        transition: transform 3s, opacity 3s;
    }
    .form-slide-enter{
        opacity: 0;
        transform: translateX(100px);
    }
    .form-slide-leave-active{
        opacity: 0;
        transform: translateX(-100px);
    }
    .form-slide-enter-active{
        transition-delay: 3s;
    }
</style>