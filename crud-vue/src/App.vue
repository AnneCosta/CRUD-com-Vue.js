<template>
    <router-view/>
</template>

<script>
import Home from './components/Home.vue';
import Login from './components/Login.vue';
import Cadastro from './components/Cadastro.vue';

export default {
  name: 'app',
  components: {
    Home,
    Login,
    Cadastro
  }
};
</script>
