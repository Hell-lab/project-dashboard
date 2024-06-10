<template>
  <v-app>
    <v-app-bar app color="white" elevate-on-scroll>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>
        <img src="./assets/oeh_logo.png" alt="Logo" height="60" />
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        class="login-btn"
        @click="goToLogin"
      >
        Login
      </v-btn>
    </v-app-bar>

    <div class="blue-bar">
      <v-col>
        <h1 class="display-2 font-weight-bold">Dashboard</h1>
      </v-col>
    </div>
    
    <v-main class="main-content">
        <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  methods: {
    goToLogin() {
      this.$router.push({ name: 'Login' });
    }
  }
};
</script>

<style lang="sass">
@import "vuetify/styles"
@import "@mdi/font/css/materialdesignicons.min.css"
@import "@fortawesome/fontawesome-free/css/all.css"

/* Your custom styles */
body
  font-family: 'Roboto', sans-serif

  .v-application
    background-color: #ffffff !important

  
  .blue-bar
    background-color: #1565c0
    color: #1565c0
    height: 140px /* Adjust height as needed */
    padding: 10px 
    margin-top: 50px

  .blue-bar h1
    margin: 0
    color: #ffffff
    font-size: 70px
    margin-left: 5px 
    margin-bottom: 20px
  
  h1
    color: #000000

  .v-app-bar
    background-color: #ffffff !important
    border-bottom: 1px solid #ccc

  .login-btn
    background-color: #f5a623 !important
    color: white !important
    border-radius: 25px
    padding: 10px 20px
    
  .main-content
    margin-left: 20px
  </style>
