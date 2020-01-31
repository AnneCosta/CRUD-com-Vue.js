<template>
<v-app id="app">
    <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
            <v-col cols="1" md="5" sm="15" class="jumbotron">
                <h3 class="text-center">Login</h3>
                <form id="app" class="text-center" @submit.prevent="checkForm">
                    <p v-if="errors.length">
                        <p v-for="error in errors" v-bind:key="error">
                            <b-alert :show="dismissCountDown" dismissible variant="danger" @dismissed="dismissCountDown=0"
                            @dismiss-count-down="countDownChanged"/>
                                <p>{{ error }}</p>
                                <b-progress variant="danger" :striped="striped" :max="dismissSecs" :value="dismissCountDown" height="3px">
                                </b-progress>

                    <div class="form-group">
                        <b-form-group>
                            <b-form-input v-model="email" name="email" placeholder="Email" class="form-control " required></b-form-input>
                        </b-form-group>
                    </div>
                    <div class="form-group">
                        <b-form-group>
                            <b-form-input type="password" v-model="senha" name="senha" placeholder="Senha" class="form-control" @keyup.enter="Login()" required></b-form-input>
                        </b-form-group>
                    </div>
                    <div class="text-center">
                        <b-button variant="outline-secondary" @click="Login()">Entrar</b-button>
                    </div>
                </form>
                <div class="posicao text-center">
                <b-form inline class="posicao ">
                    <p>Você não tem uma conta?
                    <b-link href="/cadastro" variant="link" >Crie uma conta</b-link>
                    </p>
                </b-form>
                </div>
            </v-col>
        </v-row>
    </v-container>
</v-app>
</template>

<script>
import axios from 'axios'
import firebase from 'firebase/app'


export default {
    name: 'app',
    data(){
        return{
            email: null,
            senha: null,
            errors: [],
            dismissSecs: 5,
            dismissCountDown: 0,
            showDismissibleAlert: false,
            striped: true
        }
    },
    methods: {
        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown
        },
        showAlert() {
            this.dismissCountDown = this.dismissSecs
        },
        checkForm(){
            axios
                .get ('http://localhost:3000/users')
                .then(()=>{
                    this.errors = [];

                    if(this.email && this.senha){
                        this.errors = 0
                        this.$router.push('/')
                        return true
                    }
                    else if(!this.email && !this.senha){
                        this.showAlert()
                        this.countDownChanged(5)
                    }
                })
                .catch(()=>{
                    console.log('Erro na checagem')
                })
        },
        Login(){
            
                firebase.auth().signInWithEmailAndPassword(this.email,this.senha)
                .then((user)=>{
                    this.$router.replace('home')

                },
                (err) => {
                    alert('Não foi possível realizar o login.' + err.message)
                })
                .catch(()=>{
                    console.error('Something is wrong here, boi');
                    
                })
            
        }
    }
    
}
</script>

<style>
    .posicao{
        position: relative;
        top: 1em;
        justify-content: center;
    }
</style>