new Vue({
    el: '#app',
    mounted(){
        console.log('Componente montado.')
    },
    data(){
        return{
            modal: false,
            create: true,
            users: '',
            name: '',
            email: '',
            output: '',
            id: ''
        };
    },
    created() {
        this.getUser()
    },
    methods: {
        getUser(){
            axios
            .get('http://localhost:3000/users')
            .then(user =>{
                this.users = user.data
            })
            .catch((e)=>{
                console.log(e)
            })
        },
        createUser(){
            axios
                .post('http://localhost:3000/users',{
                    name: this.name,
                    email: this.email,
                }).then(users => {
                    this.users.push(users.data)
                    this.name = ''
                    this.email = ''
                }).catch((error)=>{
                    console.log(error);
                })
        
        },
        editUser(user) {
            axios
                .get('http://localhost:3000/users/'+user.id)
                .then(user =>{
                    this.name = user.data.name;
                    this.create = false;
                    this.email = user.data.email;
                    this.id = user.data.id;
                })
        },
        deleteUser(user){
            axios
                .delete('http://localhost:3000/users/'+user.id)
                .then(user =>{
                    this.getUser()
                })
                
        },
        updateUser(){
            axios
                .put('http://localhost:3000/users/'+this.id,{
                    name: this.name,
                    email: this.email
                }).then(user =>{
                    axios  
                        .get('http://localhost:3000/users')
                        .then(user =>{
                            this.user = user.data
                            this.getUser()
                            this.create = true;
                            this.updated()
                        })
                })
        },
        updated(){
            this.name = ''
            this.email = ''
            this.id = ''
        }

    } 
})