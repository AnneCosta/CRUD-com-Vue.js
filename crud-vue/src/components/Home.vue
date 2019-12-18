<template>
    <div id="app">
        
        <div class="text-center jumbotron jumbotron-fluid">
            <h1 class="lead">Informações de usuário</h1><br>
            <b-button v-b-modal="'addUser'" @click.prevent="show=true" class="btn btn-secondary" data-toggle="modal" data-target="#addUser">Adicionar usuário</b-button>&nbsp;
            <b-button v-b-modal="'logout'" data-toggle="modal" data-target="#logout" class="btn btn-secondary">Sair</b-button>
        </div>
        <div class="container">
            <table class="table table-hover table-bordered">
                <thead class="table-secondary">
                    <tr>
                        <th class="text-center">ID</th>
                        <th class="text-center">NOME</th>
                        <th class="text-center">EMAIL</th>
                        <th colspan="2" class="text-center">AÇÕES</th>
                    </tr>
                </thead>
                <tbody class="text-center">
                    <tr v-for="user in users" v-bind:key="user.id">
                        <td>{{ user.id }}</td>
                        <td>{{ user.name }}</td>
                        <td>{{ user.email }}</td>
                        <td><b-button v-b-modal="'editUser'" @click.prevent="show=true" v-on:click="getUser(user)" variant="outline-secondary" data-toggle="modal" data-target="#addUser">Editar</b-button></td>
                        <td><b-button v-b-modal="'delete'" v-on:click="getUser(user)" variant="outline-secondary" data-toggle="modal" data-target="#delete">Excluir</b-button></td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Modal Criar -->
        <div>
            <b-modal id="addUser" button-size="sm">
                <template v-slot:modal-header="{ok, cancel, hide}" class="modal-header" id="addUser">
                    <h5>Cadastro de usuários</h5>
                    <b-button-close @click="cancel()"></b-button-close>
                </template>
                <form id="app" @submit.prevent="checkForm">
                    <p v-if="errors.length">
                        <p v-for="error in errors" v-bind:key="error">
                        <b-alert :show="dismissCountDown" dismissible variant="danger" @dismissed="dismissCountDown=0"
                        @dismiss-count-down="countDownChanged">
                            <p>{{ error }}</p>
                            <b-progress variant="danger" :striped="striped" :max="dismissSecs" :value="dismissCountDown" height="4px">
                            </b-progress>
                        </b-alert>
                    </p>
                    <div class="form-group">
                        <b-form-input v-model="name" name="name" placeholder="Nome" class="form-control" required></b-form-input>
                    </div>
                    <div class="form-group">
                        <b-form-input v-model="email" name="email" placeholder="Email" class="form-control" required></b-form-input>
                    </div>
                </form>
                <template v-slot:modal-footer="{ok, cancel, hide}" class="modal-footer" id="addUser">
                    <b-button size="sm" variant="outline-secondary" @click="$bvModal.hide('addUser')" v-on:click.once="createUser()">Enviar</b-button>
                </template>
            </b-modal>
        </div>

        <!-- Modal Editar -->
        <div>
            <b-modal id="editUser" button-size="sm">
                <template v-slot:modal-header="{ok, cancel, hide}" class="modal-header" id="editUser">
                    <h5>Editar usuário</h5>
                    <b-button-close @click="cancel()"></b-button-close>
                </template>
                <form id="app" @submit.prevent="checkForm">
                    <p v-if="errors.length">
                        <p v-for="error in errors" v-bind:key="error">
                        <b-alert :show="dismissCountDown" dismissible variant="danger" @dismissed="dismissCountDown=0"
                        @dismiss-count-down="countDownChanged">
                            <p>{{ error }}</p>
                            <b-progress variant="danger" :striped="striped" :max="dismissSecs" :value="dismissCountDown" height="4px">
                            </b-progress>
                        </b-alert>
                    </p>
                    <div class="form-group">
                        <b-form-input v-model="name" name="name" placeholder="Nome" class="form-control" minlength="1"></b-form-input>
                    </div>
                    <div class="form-group">
                        <b-form-input v-model="email" name="email" placeholder="Email" class="form-control" minlength="1"></b-form-input>
                    </div>
                </form>
                <template v-slot:modal-footer="{ok, cancel, hide}" class="modal-footer">
                    <b-button size="sm" variant="outline-secondary" @click="$bvModal.hide('editUser')" v-on:click.once="editUser()" >Editar</b-button>
                </template>
            </b-modal>
        </div>

        <!-- Modal logout -->
        <div>
            <b-modal id="logout" title="Saindo..." button-size="sm">
                <div>
                    <p class="lead text-center">Deseja realmente sair?</p>
                </div>
                <template v-slot:modal-footer="{ok, cancel, hide}" class="modal-footer" id="logout">
                    <router-link to="/login"><b-button size="sm" variant="outline-danger" @click="logout()">Sair</b-button></router-link>
                    <b-button size="sm" variant="outline-secondary" @click="cancel()">Cancelar</b-button>
                </template>
            </b-modal>
        </div>

        <!-- Modal exclusão -->
        <div>
            <b-modal id="delete" title="Excluir..." button-size="sm">
                <div>
                    <p class="lead text-center">Deseja realmente excluir esta informação?</p>
                </div>
                <template v-slot:modal-footer="{ok, cancel, hide}" class="modal-footer" id="delete">
                    <b-button size="sm" variant="outline-danger" v-on:click="deleteUser()" @click="$bvModal.hide('delete')">Excluir</b-button>
                    <b-button size="sm" variant="outline-secondary" @click="cancel()">Cancelar</b-button>
                </template>
            </b-modal>
        </div>

    </div>
</template>

<script>
import axios from 'axios'
import firebase from 'firebase/app'

export default {
    name: 'app',
    
    data(){
        return{
            errors: [],
            create: true,
            users: null,
            name: null,
            email: null,
            id: null,
            dismissSecs: 5,
            dismissCountDown: 0,
            showDismissibleAlert: false,
            striped: true
        }
    },
    created(){
        this.getUsers()
    },
    methods:{
        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown
        },
        showAlert() {
            this.dismissCountDown = this.dismissSecs
        },
        checkForm: function(){
            if(this.name && this.email){
                this.errors = 0;
                return true
            }
            
            this.errors = [];

            if(!this.name){
                this.errors.push('O nome é obrigatório!')   
                this.showAlert()
                this.countDownChanged(5)
            }

            if(!this.email){
                this.errors.push('O email é obrigatório!')
                this.showAlert()
                this.countDownChanged(5)
            }
            if(this.errors.length > 0){
                return false                
            }
            
        },
        getUsers(){
            axios
            .get('http://localhost:3000/users')
            .then(user =>{
                this.users = user.data
            }).catch(()=>{
                console.log('Erro de usuários')
            })
        },
        getUser(user){
            axios
            .get('http://localhost:3000/users/'+user.id)
            .then(user =>{
                this.name = user.data.name;
                this.create = false;
                this.email = user.data.email;
                this.id = user.data.id;
            }).catch(()=>{
                console.log('Erro de usuário')
            })
        },
        createUser(){
            if(this.checkForm()){
                axios
                .post('http://localhost:3000/users',{
                    name: this.name,
                    email: this.email,
                }).then(() => {
                    this.getUsers()
                    console.log(this.name)
                    this.name = null
                    this.email = null
                    
                }).catch(()=>{
                    console.log('Erro na criação de usuários')
                })
            }
        },
        editUser() {
            axios
            .put('http://localhost:3000/users/'+this.id,{
                name: this.name,
                email: this.email,
            }).then(() => {
                if(this.checkForm()){
                    this.getUsers()
                    console.log(this.name)
                }
            }).catch(()=>{
                console.log('Erro de edição de usuário')
            })
                
        },
        deleteUser(){
            axios
                .delete('http://localhost:3000/users/'+this.id)
                .then(() =>{
                    this.getUsers()
                    this.id = null
                    this.name = null
                    this.email = null
                }).catch(()=>{
                console.log('Erro de exclusão de usuário')
            })
        },
        logout(){
            firebase.auth().signOut().then(()=>{
                this.$router.replace('login').catch(err=>{})
            })
        }
    }
}
</script>
