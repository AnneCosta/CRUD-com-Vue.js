new Vue({
    el: '#app',
    data(){
        return{
            errors: [],
            create: true,
            users: null,
            name: null,
            email: null,
            id: null
        };
    },
    created() {
        this.getUsers()
    },
    methods: {
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
})