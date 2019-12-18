<template>
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
</template>

<script>
export default {
    name:'app',
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
    methods: {
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
    methods:{
        checkForm: function(e){
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
            .catch((e)=>{
                console.log(e)
            })
        },
        getUser(user){
            console.log(user.id)
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
                }).then(users => {
                    this.getUsers()
                    this.name = null
                    this.email = null
                }).catch((error)=>{
                    console.log(error);
                })
            }
        },
        editUser() {
            axios
            .put('http://localhost:3000/users/'+this.id,{
                name: this.name,
                email: this.email,
            }).then(users => {
                if(this.checkForm()){
                    this.name = null,
                    this.email = null,
                    this.getUsers()
                }
            }).catch((error)=>{
                console.log(error);
            })
                
        },
        deleteUser(user){
            axios
                .delete('http://localhost:3000/users/'+user.id)
                .then(user =>{
                    this.getUsers()
                })
        }
    }
    }
}
</script>