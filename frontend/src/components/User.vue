<template>
    <div class="user-detail">
      <h1>{{ user.displayName }}</h1>
      <p><strong>Role:</strong> {{ role.name }}</p>
      <img :src="userProfilePictureUrl" alt="Profile Picture" v-if="userProfilePictureUrl" />
  
      <h2>Projects</h2>
      <ul>
        <li v-for="project in projects" :key="project.id" class="project-item">
          <router-link :to="'/projects/' + project.id">{{ project.name }}</router-link>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        user: {},
        role: {},
        projects: [],
        userProfilePictureUrl: null,
      };
    },
    async created() {
      const userId = this.$route.params.userId;
      const apiBaseUrl = process.env.VUE_APP_API_BASE_URL  || 'http://localhost:3000';
  
      try {
        // Fetch user information
        const userResponse = await axios.get(`${apiBaseUrl}/api/users/${userId}`);
        this.user = userResponse.data;
  
        // Convert the profile picture Blob to a URL
        if (this.user.profilePicture) {
          const blob = new Blob([new Uint8Array(this.user.profilePicture.data)], { type: 'image/jpeg' });
          this.userProfilePictureUrl = URL.createObjectURL(blob);
        }
  
        // Fetch role information
        const roleResponse = await axios.get(`${apiBaseUrl}/api/roles/${this.user.roleDictId}`);
        this.role = roleResponse.data;
  
        // Fetch projects the user is involved in
        const projectsResponse = await axios.get(`${apiBaseUrl}/api/users/${userId}/projects`);
        this.projects = projectsResponse.data;
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    }
  };
  </script>
  
  <style lang="sass">
    .project-item
        margin-left:30px
  </style>
  