<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <label for="Username">Name:</label><br>
      <input type="Username" id="username" v-model="username"><br>
      <label for="password">Password:</label><br>
      <input type="password" id="password" v-model="password"><br><br>
      <button type="submit">Login</button>
    </form>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    login() {
      const apiBaseUrl = process.env.VUE_APP_API_BASE_URL || 'http://localhost:3000';

      const url = `${apiBaseUrl}/login`;
      axios.post(url, { username: this.username, pw: this.password })
        .then(response => {
          const { token } = response.data;
          localStorage.setItem('token', token);
          this.$emit('login-success');
          // Redirect to desired page upon successful login
          this.$router.push('/');
        })
        .catch(error => {
          console.error('Error:', error);
          this.errorMessage = 'Login failed. Please check your credentials.';
          console.error('Server response:', error.response.data);
        });
    }
  }
};
</script>

<style lang="sass">
 .error-message
  color: red 
  margin-top: 10px
 </style>
