<template>
  <div v-if=open>
    <div class="backdrop"></div>
    <div class="zone">
        <div class="img_atl"><img :src=article.images[0]></div>
        <div class="block_cmt">zdzezea</div>
    </div>
  </div>
</template>

<script>
export default {
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

<style scoped>
.backdrop{
    position:absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, .4);
    z-index: 100000;
}
.zone{
    display: flex;
    flex-direction: row;
}
.img_atl{

}
</style>
