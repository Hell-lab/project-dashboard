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
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: ''
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
          alert('Login successful!');
          // Redirect to desired page upon successful login
          this.$router.push('/');
        })
        .catch(error => {
          console.error('Error:', error);
          alert('Login failed. Please check your credentials.');
          console.error('Server response:', error.response.data);
        });      
    }
  }
};
</script>

<style>
/* TODO: Add your CSS styles here */
</style>
