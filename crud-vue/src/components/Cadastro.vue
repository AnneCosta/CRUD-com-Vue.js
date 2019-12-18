<template>
    <div id="app">
        <div class="container jumbotron col-sm-6 col-xs-offset-5">
        <h3>Cadastro de usuário</h3>
        <form id="app" class="text-left" @submit.prevent="checkForm">
            <div class="">
                <p v-if="errors.length">
                    <p v-for="error in errors" v-bind:key="error">
                        <b-alert :show="dismissCountDown" dismissible variant="danger" @dismissed="dismissCountDown=0"
                        @dismiss-count-down="countDownChanged">
                            <p>{{ error }}</p>
                            <b-progress variant="danger" :striped="striped" :max="dismissSecs" :value="dismissCountDown" height="3px">
                            </b-progress>
                        </b-alert>
                    </p>
            </div>
            <div class="form-group">
                <b-form-group>
                    <b-form-input v-model="email" name="email" placeholder="Email" class="form-control " required></b-form-input>
                </b-form-group>
            </div>
            <div class="form-group">
                <b-form-group>
                    <b-form-input type="password" v-model="senha" name="senha" placeholder="Senha" class="form-control " required></b-form-input>
                </b-form-group>
            </div>
            <div class="text-center">
                <b-button variant="outline-secondary" v-on:click="writeUserData()">Cadastrar</b-button>
            </div>
        </form>
    </div>
    </div>
</template>


<script>
import axios from 'axios'
import firebase from 'firebase/app'
import {db} from 'firebase'

export default {
    name: 'app',
    data(){
        return{
            users: {},
            email: null,
            senha: null,
            errors: [],
            dismissSecs: 5,
            dismissCountDown: 0,
            showDismissibleAlert: false,
            striped: true
        }
        mounted: {
            console.log(firebase.auth)
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
            console.log(this.errors)
            axios
                .get('http://localhost:3000/users')
                .then(()=>{

                    this.errors = [];

                    if(this.nome && this.email && this.senha && this.confirma_senha){
                        this.errors = 0
                        this.$router.push('/login')
                        return true
                    }
                    else if(!this.nome && !this.email && !this.senha && !this.confirma_senha){
                        this.errors.push('Por favor, preencha todos os campos.')
                        this.showAlert()
                        this.countDownChanged(5)
                    }
                })
                .catch(()=>{
                    console.log('Erro na checagem')
                })
        },
        signUp(){
            firebase.auth().createUserWithEmailAndPassword(this.email,this.senha)
            .then((user)=>{
                this.$router.replace('login')
            },
            (err)=>{
                alert('Ocorreu algo inesperado.' + err.message)
            })
        },
        writeUserData(id, name, email) {
            if(this.checkForm()){
                db.collection('Users').add({
                name: name,
                email: email,
            }).then((user)=>{
                this.$router.replace('login')
            },
            (err)=>{
                alert('Ocorreu algo inesperado.' + err.message)
            })
            }
        }
    }
}
</script>