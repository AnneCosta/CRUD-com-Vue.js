<template>
    <div id="app">
        
        <div class="text-center jumbotron jumbotron-fluid">
            <h6 class="lead">Informações de usuário</h6><br>
            <b-button v-b-modal="'addUser'" @click="show=true" class="btn btn-secondary" data-toggle="modal" data-target="#addUser">Adicionar usuário</b-button>
            <button type="button" class="btn btn-secondary">Sair</button>
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
                        <td><input type="button" v-on:click="getUser(user)" data-toggle="modal" data-target="#editUser" value="Editar" class="btn btn-outline-secondary"></td>
                        <td><input type="button" v-on:click="deleteUser(user)" value="Excluir" class="btn btn-outline-secondary"></td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Modal Criar -->
        <div>
            <b-modal id="addUser" title="Cadastro de usuários" button-size="sm">
                <form id="app" @submit.prevent="checkForm">
                    <p v-if="errors.length">
                        <ul>
                            <li v-for-key="error in errors">{{ error }}</li>
                        </ul>
                    </p>
                    <div class="text-center">
                        <div class="form-group">
                            <input type="text" v-model="name" name="name" placeholder="Nome" class="form-control" minlength="1">
                        </div>
                        <div class="form-group">
                            <input type="text" v-model="email" name="email" placeholder="Email" class="form-control" minlength="1">
                        </div>
                    </div>
                    
                </form>
                <template v-slot:modal-footer="{ok, cancel, hide}" class="modal-footer">
                        <b-button size="sm" class="btn btn-outline-secondary" @click="createUser()">Enviar</b-button>
                    </template>
            </b-modal>
        </div>

        <!-- Modal Editar -->
        <div class="modal fade" id="editUser" tabindex="-1" role="dialog" aria-labelledby="editUserTitle">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editUserTitle">Editar usuário</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form id="app" @submit.prevent="checkForm">
                        <div class="modal-body">
                            <p v-if="errors.length">
                                <ul>
                                    <li v-for-key="error in errors">{{ error }}</li>
                                </ul>
                            </p>
                            <div class="text-center">
                                <div class="form-group">
                                    <input type="text" v-model="name" name="name" placeholder="Nome" class="form-control" minlength="1">
                                </div>
                                <div class="form-group">
                                    <input type="text" v-model="email" name="email" placeholder="Email" class="form-control" minlength="1">
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <div v-if='errors == 0'>
                                <input type="submit" v-on:click="editUser()" value="Enviar" data-dismiss="modal" class="btn btn-outline-secondary">
                            </div>
                            <div v-else>
                                <input type="submit" v-on:click="editUser()" value="Enviar" class="btn btn-outline-secondary">
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { BButton } from 'bootstrap-vue'

export default {
    components: {
        BButton: 'b-button'
    },
    name: 'app',
    data(){
        return{
            errors: [],
            create: true,
            users: null,
            name: null,
            email: null,
            id: null
        }
    },
    created(){
        this.getUsers()
    },
    methods:{
        checkForm: function(){
            if(this.name && this.email){
                this.errors = 0;
                return true
            }
            
            this.errors = [];

            if(!this.name){
                this.errors.push('O nome é obrigatório!')                
            }

            if(!this.email){
                this.errors.push('O email é obrigatório!')
                
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
                    this.name = null
                    this.email = null
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
                    this.name = null,
                    this.email = null,
                    this.getUsers()
                }
            })
                
        },
        deleteUser(user){
            axios
                .delete('http://localhost:3000/users/'+user.id)
                .then(() =>{
                    this.getUsers()
                })
        }
    }
}
</script>
