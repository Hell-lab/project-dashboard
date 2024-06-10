<template>
    <div class="project">
      <h1>{{ project.name }}</h1>
      <p>{{ project.description }}</p>
      
      <h2>Team Members</h2>
      <ul>
        <li v-for="member in teamMembers" :key="member.userId">{{ member.User.displayName }}</li>
      </ul>
  
      <h2>Statuses</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="status in statuses" :key="status.id">
            <td>{{ status.since }}</td>
            <td>{{ status.description }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        project: {},
        teamMembers: [],
        statuses: [],
      };
    },
    async created() {
      const projectId = this.$route.params.projectId;
  
      try {
        // Fetch general project information
        const projectResponse = await axios.get(`http://localhost:3000/api/projects/${projectId}`);
        this.project = projectResponse.data;
  
        // Fetch team members
        const teamResponse = await axios.get(`http://localhost:3000/api/projects/${projectId}/team`);
        this.teamMembers = teamResponse.data;
  
        // Fetch statuses
        const statusesResponse = await axios.get(`http://localhost:3000/api/statuses/project/${projectId}`);
        this.statuses = statusesResponse.data.sort((a, b) => new Date(b.date) - new Date(a.date));
      } catch (error) {
        console.error('Error fetching project details:', error);
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  