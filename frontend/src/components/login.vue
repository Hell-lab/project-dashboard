<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <label for="name">Name:</label><br>
      <input type="name" id="name" v-model="name"><br>
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
      name: '',
      password: ''
    };
  },
  methods: {
    login() {
      const url = 'http://localhost:3000/login'; // TODO: Adjust URL
      axios.post(url, { username: this.name, password: this.password })
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
