<template>
  <h1>Login / Register</h1>
  <div id="firebaseui-auth-container"></div>
</template>
<script>
import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css'

export default {
  name: 'AuthComp',
  mounted() {
    const ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#firebaseui-auth-container', {
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.PhoneAuthProvider.PROVIDER_ID
      ],
      signInSuccessUrl: '/create',
    });
  },
};
</script>



