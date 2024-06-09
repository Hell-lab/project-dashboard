<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <label for="email">Email:</label><br>
      <input type="email" id="email" v-model="email"><br>
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
      email: '',
      password: ''
    };
  },
  methods: {
    login() {
      const url = 'http://localhost:3000/api/login'; // TODO: Adjust URL
      axios.post(url, { username: this.email, password: this.password })
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
        });
    }
  }
};
</script>

<style>
/* TODO: Add your CSS styles here */
</style>
