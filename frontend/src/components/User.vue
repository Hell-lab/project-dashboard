<template>
    <div class="user-detail">
      <h1>{{ user.displayName }}</h1>
      <p><strong>Role:</strong> {{ role.name }}</p>
      <div class="profile-picture-section">
        <img :src="userProfilePictureUrl" alt="Profile Picture" v-if="userProfilePictureUrl" height="200"/>
        <div class="upload-section" v-if="showChangeProfilePicture">
            <input type="file" @change="onFileChange" class="input-btn"/>
            <v-btn @click="uploadProfilePicture" class="upload-btn">Upload Profile Picture</v-btn>
        </div>
      </div>
  
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
        selectedFile: null,
        showChangeProfilePicture: (localStorage.getItem('token') !== null),
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
    },
    methods: {
        onFileChange(event) {
        this.selectedFile = event.target.files[0];
        },
        async uploadProfilePicture() {
        if (!this.selectedFile) return;

        const userId = this.$route.params.userId;
        const apiBaseUrl = process.env.VUE_APP_API_BASE_URL || 'http://localhost:3000';

        const token = localStorage.getItem('token');

        const formData = new FormData();
        formData.append('profilePicture', this.selectedFile);

        try {
            await axios.post(`${apiBaseUrl}/api/users/${userId}/uploadProfilePicture`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'authorization': `Bearer ${token}` 
            }
            });
            this.$router.go()
        } catch (error) {
            console.error('Error uploading profile picture:', error);
        }
      }
    }
  };
  </script>
  
  <style lang="sass">
    .project-item
        margin-left:30px
    
    .upload-btn
        background-color: #f5a623 !important
        color: white !important
        border-radius: 25px
        padding: 10px 20px
        border: none
        cursor: pointer

    .profile-picture-section 
        display: flex
        align-items: center

    .profile-picture-section img 
        margin-right: 20px
        max-width: 150px
        height: auto


    .upload-section 
        display: flex
        flex-direction: column


    .input-btn 
        margin-bottom: 10px

  </style>
  