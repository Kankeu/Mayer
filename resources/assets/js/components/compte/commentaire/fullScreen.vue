
<template>
  <div @dblclick="close" v-show=open>
    <div class="backdrop">
        <span class="close" @click="close">X</span>
        <md-layout md-column md-gutter>
            <md-layout md-flex="80" class="glob" md-gutter>
                <md-layout  md-flex="45"><img :src="article.images[0].path"></md-layout>
                <md-layout md-flex="5"></md-layout>
                <md-layout  md-flex="50"><commentaire class="comments" :article="article" :margin="false" :open="article.commentOpen"></commentaire></md-layout>
            </md-layout>
            <md-layout><div class="atl_sup"><div v-for="n in 10"><img :src="article.images[0].path"></div></div></md-layout>
        </md-layout>
    </div>
  </div>
</template>

<script>
import commentaire from "./Commentaire"

export default {
    components:{commentaire},
    props:{
        open: Boolean,
        article: Object
    },
    data(){
        return { 
            state:{scroll:null}
        }
    },
    methods:{
        loadComments(){
            console.log(this.article)
        },
        close(){
            this.article.commentOpen = false
        }
    },
    mounted(){
        this.$commentaire = this.$resource('/comments/'+this.article.id+'{/id}')
    },
    watch:{
        open(data){
            if(data===true){
                document.querySelector('body').style.overflow = "hidden"  
                this.state.scroll = document.querySelector('body').scrollTop
                this.loadComments()
            }else{
                document.querySelector('body').style.overflowY = "auto"
                document.querySelector('body').scrollTop = this.state.scroll 
            }
        },
    }
}
</script>

<style scoped lang="scss">
.backdrop{
    position:fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .4);
    z-index: 100000;
    display: flex;
    flex-direction: column;
    padding: 10px;
}
.close{
    position: fixed;
    top: 10px;
    right: 10px;
    font-size: 30px;
    opacity: .8;
    color: #fff;
    &:hover{
        opacity: 1;
        font-size: 35px;
        transition: .3s;
    }
}
.alt .img_atl {
    & img {
        position:fixed;
    }
}
.alt .block_cmt{
    & div{
        position: fixed;
    }
}
.atl_sup{
    display: flex;
    flex-direction: row;
    margin-top: 10px;
    justify-content: space-between;
    width: 100%;
    & div{
        width:130px;
    }
}
.comments{
    width:100%;
    height:100%;
}
.img_atl{
    display:flex;
    flex-direction: row;
    justify-content:space-between
}
.block{
     padding:10px;
}
.glob{
    height: 80%;
}
</style>
