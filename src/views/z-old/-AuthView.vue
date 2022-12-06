<template>
  <AuthComp />
</template>
<script>
import AuthComp from '../components/AuthComp.vue';
export default {
  components: { AuthComp },
  name: 'AuthView',
  mounted() {
    if( this.$cookies.isKey('uId') ) {
      console.log('AuthView > mounted(): there is a uId. redirecting to /create');
      this.$router.push('/create')
    } else {
      console.log('AuthView > mounted(): there is no uId. staying on /auth and loading AuthComp');
    }
  },
};
</script>
