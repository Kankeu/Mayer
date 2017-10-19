<template>
    <div>
        <md-whiteframe md-elevation="3">
            <md-toolbar>
                <router-link :to="{name: 'ACCUEIL'}">
                    <md-button class="md-icon-button" v-if="$route.name === 'INSCRIPTION'">
                        <md-icon>chevron_left</md-icon>
                    </md-button>
                </router-link>
                <h2 class="md-title white" style="flex: 1">{{$route.name}}</h2>
                <md-button class="md-icon-button">
                    <md-icon>login</md-icon>
                </md-button>
                <md-button id="btn-connexion" class="white"  @click="$refs['connexion'].open()">connexion</md-button>
            </md-toolbar>
        </md-whiteframe>
        <md-dialog md-open-from="#btn-connexion" md-close-to="#btn-connexion"  ref="connexion">
            <md-dialog-title>CONNEXION</md-dialog-title>
            <md-dialog-content class="position-box">
                <form method="POST" action="/" class="form">
                    <md-input-container class="none">
                        <md-input :value="csrfToken" name="_token" type="hidden"></md-input>
                    </md-input-container>
                    <md-input-container>
                        <label>Adresse</label>
                        <md-input type="email" name="email" required></md-input>
                    </md-input-container>
                    <md-input-container md-has-password>
                        <label>Mot de passe</label>
                        <md-input type="password" name="password" required></md-input>
                    </md-input-container>
                    <md-button type="submit" class="none"></md-button>
                </form>
            </md-dialog-content>
            <md-dialog-actions>
                <md-button class="md-primary" @click="$refs['connexion'].close()">Annuler</md-button>
                <md-button class="md-primary" @click="submit">Se connecter</md-button>
            </md-dialog-actions>
        </md-dialog>
        <main id="main-content">
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
                csrfToken: window.Laravel.csrfToken
            }
        },
        methods:{
            submit(){
                document.querySelector('.form button[type=submit]').click()
            }
        }
    }
</script>


<style lang="scss" scoped>
    .md-whiteframe {
        position: fixed;
        margin-top: -70px;
        width: 100%;
        z-index: 10;
    }
    .white{
        color: #fff;
    }
    .md-input-container input{
        font-family: monospace;
    }
    .position-box{
        overflow: hidden;
    }
    .none{
        display: none;
    }
    #main-content {
        position: relative;
        z-index: 1;
        margin-top: 70px;
    }
    .md-icon{
        color:white
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