<template>
    <div class="div-btn-inscript">
        <router-link :to="{name: 'INSCRIPTION'}" class="btn-inscript"><md-button>S'inscrire</md-button></router-link>
    </div>
</template>

<script>
    export default{
        data(){
            return {

            }
        }
    }
</script>

<style lang="scss">
    .div-btn-inscript{
        height: 100vh;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: absolute;
    }
    .btn-inscript{
        align-self: center;
        background-color: #fed136;
        border-color: #fed136;
        color: #fff;
        opacity: .9;
        transition: opacity .3s;
        &:hover{opacity: 1;}
    }
    .btn-inscript .md-button{
        text-transform: none;
    }
    .btn-inscript .md-button:hover{
        background-color: inherit!important;
    }
</style>