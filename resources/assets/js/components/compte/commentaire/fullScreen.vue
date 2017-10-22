
<template>
  <div v-if=open>
    <div class="backdrop">
        <div class="alt">
            <div class="img_atl"><img :src="article.images[0].path"></div>
            <div class="block_cmt"><commentaire :article="article" :margin="false" :open="open"></commentaire></div>
        </div>
        <div class="atl_sup"><div v-for="n in 10"><img :src="article.images[0].path"></div></div>
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

        }
    },
    methods:{
        loadComments(){
            console.log(this.article)
        }
    },
    mounted(){
        this.$commentaire = this.$resource('/comments/'+this.article.id+'{/id}')
    },
    watch:{
        open(data){
            if(data===true){
                this.loadComments()
            }
        },
    }
}
</script>

<style scoped lang="scss">
.backdrop{
    position:absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin-top:-70px;
    background-color: rgba(0, 0, 0, .4);
    z-index: 100000;
    display: flex;
    flex-direction: column;
    padding: 10px;
}
.alt{
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content:space-between;
}
.alt .img_atl {
    flex:.6;
    & img {
        position:fixed;
    }
}
.alt .block_cmt{
    flex:.4;
    & div{
        position: fixed;
    }
}
.atl_sup{
    position: fixed;
    display: flex;
    flex-direction: row;
    margin-top: 10px;
    justify-content: space-between;
    width: 98%;
    bottom: 10px;
    & div{
        width:130px;
    }
}
.img_atl{
    display:flex;
    flex-direction: row;
    justify-content:space-between
}
.block{
     padding:10px;
}
</style>
