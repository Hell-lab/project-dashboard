<template>
  <div class="project">
    <h1>{{ project.name }}</h1>
    <p><strong>Category:</strong> {{ category.name }}</p>
    <p>{{ project.description }}</p>
    
    <h2>Team Members</h2>
    <ul>
      <li v-for="member in teamMembers" :key="member.userId" class="member-item">
        <router-link :to="'/users/' + member.id">{{ member.displayName }}</router-link>
      </li>
    </ul>

    <h2>Project History</h2>
    <v-table fixed-header class="project-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Milestone</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="status in statuses" :key="status.id">
          <td>{{ status.since }}</td>
          <td>
            <span v-tooltip="status.milestoneDescription">{{ status.milestoneName }}</span>
          </td>
          <td>{{ status.description }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
  <v-btn 
    class="mt-4"
    color="primary"
    @click="toggleAddStatusSection"
    v-if="showAddStatus"
  >
    Update Status
  </v-btn>

  <v-btn 
    class="mt-4"
    color="primary"
    @click="deleteCurrentProject"
    v-if="showDeleteProject"
  >
    Delete Project
  </v-btn>

  <v-card v-if="showAddStatusSection">
    <v-card-title>Add new Status Update</v-card-title>
    <v-card-text>
      <v-form @submit.prevent="addStatus">
        <v-textarea
          v-model="newStatus.description"
          label="Description"
          required
        ></v-textarea>
        <v-select
          v-model="newStatus.milestoneDictId"
          :items="milestoneItems"
          item-title="name"
          item-value="id"
          label="Milestone"
          required
        ></v-select>
        <v-btn type="submit" color="primary">Update Status</v-btn>
      </v-form>
    </v-card-text>
    </v-card> 
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      showAddStatusSection: false,
      showAddStatus: (localStorage.getItem('token') !== null),
      showDeleteProject: (localStorage.getItem('token') !== null),
      newStatus: {
        milestoneDictId: '',
        description: ''
      },

      project: {},
      category: {},
      teamMembers: [],
      statuses: [],
    };
  },
  async created() {
    const projectId = this.$route.params.projectId;
    const apiBaseUrl = process.env.VUE_APP_API_BASE_URL  || 'http://localhost:3000';

    this.fetchMilestones();

    this.fetchStatuses();
  },
  methods: {
    toggleAddStatusSection() {
      this.showAddStatusSection = !this.showAddStatusSection;
    },

    async fetchStatuses(){
      const projectId = this.$route.params.projectId;
      const apiBaseUrl = process.env.VUE_APP_API_BASE_URL  || 'http://localhost:3000';

      try {
      // Fetch general project information
      const projectResponse = await axios.get(`${apiBaseUrl}/api/projects/${projectId}`);
      this.project = projectResponse.data;

      // Fetch category
      const categoryResponse = await axios.get(`${apiBaseUrl}/api/categories/${this.project.categoryDictId}`);
      this.category = categoryResponse.data;

      // Fetch team members
      const teamResponse = await axios.get(`${apiBaseUrl}/api/projects/${projectId}/team`);
      this.teamMembers = teamResponse.data;

      // Fetch statuses and their associated milestones
      const statusesResponse = await axios.get(`${apiBaseUrl}/api/statuses/project/${projectId}`);
      const statuses = statusesResponse.data;

      // Fetch milestones for each status
      for (let status of statuses) {
        const milestoneResponse = await axios.get(`${apiBaseUrl}/api/milestones/${status.milestoneDictId}`);
        status.milestoneName = milestoneResponse.data.name;
        status.milestoneDescription = milestoneResponse.data.description;
      }

      this.statuses = statuses.sort((a, b) => new Date(b.since) - new Date(a.since));
    } catch (error) {
      console.error('Error fetching project details:', error);
    }
    },

    async fetchMilestones() {
      const apiBaseUrl = process.env.VUE_APP_API_BASE_URL || 'http://localhost:3000';

      try {
        const response = await axios.get(`${apiBaseUrl}/api/milestones`);
        this.milestoneItems = response.data.map(ms => ({
          name: ms.name,
          id: ms.id,
        }));
      } catch (error) {
        console.error('There was an error fetching the milestones!', error);
      }
    },

    async addStatus(){
      const apiBaseUrl = process.env.VUE_APP_API_BASE_URL || 'http://localhost:3000';
      const token = localStorage.getItem('token');

      try {
        this.newStatus = {projectId: this.project.id, description: this.newStatus.description, milestoneDictId: this.newStatus.milestoneDictId};  
        await axios.post(`${apiBaseUrl}/api/statuses`, this.newStatus, {
            headers: { 'authorization': `Bearer ${token}` }}); 
      } catch (error) {
        console.error('There was an error adding the status!', error);
      }
      this.newStatus = { milestoneDictId: '', description: '' },
      this.fetchStatuses(); 
      this.toggleAddStatusSection();
    },

    async deleteCurrentProject(){
      const apiBaseUrl = process.env.VUE_APP_API_BASE_URL || 'http://localhost:3000';
      const token = localStorage.getItem('token');

      try {
        await axios.delete(`${apiBaseUrl}/api/projects/${this.project.id}/team`, {
          headers: { 'authorization': `Bearer ${token}` }
        });
        await axios.delete(`${apiBaseUrl}/api/statuses/project/${this.project.id}`, {
          headers: { 'authorization': `Bearer ${token}` }
        });

        await axios.delete(`${apiBaseUrl}/api/projects/${this.project.id}`, {
            headers: { 'authorization': `Bearer ${token}` }
        }); 
        alert('Project deleted.');
        this.$router.push('/');

      } catch (error) {
        console.error('There was an error deleting the project!', error);
      }
    }
  }
};
</script>

<style lang="sass">
    .member-item
        margin-left: 30px

    .project-table
        width: 100%  
    
</style>
