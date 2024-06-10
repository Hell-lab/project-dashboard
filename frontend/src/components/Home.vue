<template>
  <v-row>
    <v-col>
      <v-btn
        class="mt-4"
        color="primary"
        @click="toggleAddProjectSection"
      >
        Add New Project
        <!--<v-icon right>{{ showAddProjectSection ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>-->
      </v-btn>

      <v-card v-if="showAddProjectSection">
        <v-card-title>Add New Project</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="addProject">
            <v-text-field
              v-model="newProject.name"
              label="Name"
              required
            ></v-text-field>
            <v-textarea
              v-model="newProject.description"
              label="Description"
              required
            ></v-textarea>
            <v-select
              v-model="newProject.categories"
              :items="categoryItems"
              item-title="name"
              item-value="id"
              label="Category"
              required
            ></v-select>
            <v-select
              v-model="newProject.team"
              :items="teamMembers"
              item-title="displayName"
              item-value="userId"
              label="Team"
              multiple
              required
            ></v-select>
            <v-btn type="submit" color="primary">Add Project</v-btn>
          </v-form>
        </v-card-text>
       </v-card> 
    </v-col>
  </v-row>

  <v-row>
    <v-col>
      <h3>Project List</h3>
      <v-simple-table>
        <thead>
          <tr>
            <th>Project</th>
            <th>Description</th>
            <th>Category</th>
            <th>Status</th>
            <th>Last Updated</th>
            <th>Team</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="project in projects" :key="project.id">
            <td><router-link :to="'/projects/' + project.id">{{ project.name }}</router-link></td>
            <td>{{ project.description }}</td>
            <td>{{ project.category }}</td>
            <td>{{ project.milestone }}</td>
            <td>{{ project.lastUpdate }}</td>
            <td>
              <span v-for="(user, index) in project.team.slice(0, 2)" :key="index">
                <router-link v-if="user && user.userId" :to="`/users/${user.userId}`">{{ user.displayName }}</router-link>
                <template v-if="index < 1 && project.team.length > 1">, </template>
              </span>
              <template v-if="project.team.length > 2"> et al.</template>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-col>
  </v-row>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      showAddProjectSection: false,
      newProject: {
        name: '',
        description: '',
        categoryDictId: ''
      },
      newStatus: {
        description: 'Project created',
        projectId: '',
        milestoneDictId: 1,
        since: ''
      },
      projects: [],
      teamMembers: [],
      categories: []
    };
  },
  created() {
    this.fetchProjects();
    this.fetchTeamMembers();
    this.fetchCategories();
  },
  methods: {
    toggleAddProjectSection() {
      this.showAddProjectSection = !this.showAddProjectSection;
    },
    async fetchProjects() {
      const apiBaseUrl = process.env.VUE_APP_API_BASE_URL || 'http://localhost:3000';

      try {
        const response = await axios.get(`${apiBaseUrl}/api/projects`);
        this.projects = await Promise.all(response.data.map(async project => {
          const statusResponse = await axios.get(`${apiBaseUrl}/api/statuses/project/${project.id}`);
          const sortedStatuses = statusResponse.data.sort((a, b) => new Date(b.since) - new Date(a.since));
          const latestStatus = sortedStatuses[0];
          
          const milestoneResponse = await axios.get(`${apiBaseUrl}/api/milestones/${latestStatus.milestoneDictId}`);
          const lastUpdate = new Date(latestStatus.since);
          const today = new Date();
          const diffTime = Math.abs(today - lastUpdate);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

          const categoryResponse = await axios.get(`${apiBaseUrl}/api/categories/${project.categoryDictId}`);
          const teamResponse = await axios.get(`${apiBaseUrl}/api/projects/${project.id}/team`);

          return {
            ...project,
            category: categoryResponse.data.name,
            status: latestStatus.description,
            milestone: milestoneResponse.data.name,
            team: teamResponse.data.map(member => ({
              userId: member.id,
              displayName: member.displayName
            })),
            lastUpdate: `${diffDays} day(s) ago`
          };
        }));
      } catch (error) {
        console.error('There was an error fetching the projects!', error);
      }
    },
    async fetchCategories() {
      const apiBaseUrl = process.env.VUE_APP_API_BASE_URL || 'http://localhost:3000';

      try {
        const response = await axios.get(`${apiBaseUrl}/api/categories`);
        this.categoryItems = response.data.map(cat => ({
          name: cat.name,
          id: cat.id
        }));
      } catch (error) {
        console.error('There was an error fetching the team members!', error);
      }
    },
    async fetchTeamMembers() {
      const apiBaseUrl = process.env.VUE_APP_API_BASE_URL || 'http://localhost:3000';

      try {
        const response = await axios.get(`${apiBaseUrl}/api/Users`);
        this.teamMembers = response.data.map(member => ({
          displayName: member.displayName,
          userId: member.id
        }));
      } catch (error) {
        console.error('There was an error fetching the team members!', error);
      }
    },
    async addProject() {
      const apiBaseUrl = process.env.VUE_APP_API_BASE_URL || 'http://localhost:3000';
      const token = localStorage.getItem('token');
      var createdProject;
      const newProjectToSend = {name: this.newProject.name, description: this.newProject.description, categoryDictId: this.categoryItems[this.newProject.categories-1].id }
      console.log("Test2");

      try {
        createdProject = await axios.post(`${apiBaseUrl}/api/projects`, newProjectToSend, {
            headers: { 'authorization': `Bearer ${token}` }});
        this.showAddProjectSection = false;
      } catch (error) {
        console.error('There was an error adding the project!', error);
      }
      const newProjectId= createdProject.data.id;
      try {
        this.newStatus = {projectId: newProjectId, description: 'Project created', milestoneDictId: 1};  
        await axios.post(`${apiBaseUrl}/api/statuses`, this.newStatus, {
            headers: { 'authorization': `Bearer ${token}` }}); 
      } catch (error) {
        console.error('There was an error adding the status!', error);
      }

      for(let i = 0; i < this.newProject.team.length; i++) {
        try {
        this.newTeam = {userId: this.teamMembers[this.newProject.team[i]-1].userId};  
        await axios.post(`${apiBaseUrl}/api/projects/${newProjectId}/team`, this.newTeam, {
            headers: { 'authorization': `Bearer ${token}` }});
        } catch (error) {
            console.error('There was an error adding the team!', error);
        }
      }

      this.newProject = {name: '', description: '', categoryDictId: '', team:''};
      this.fetchProjects(); // Refresh the list of projects after adding a new one      
    }
  }
};
</script>

<style lang="sass">
@import "vuetify/styles"
@import "@mdi/font/css/materialdesignicons.min.css"
@import "@fortawesome/fontawesome-free/css/all.css"

/* Your custom styles */

h1
  color: #000000

.v-app-bar
  background-color: #ffffff !important
  border-bottom: 1px solid #ccc

.v-btn--icon
  color: #f5a623

.v-simple-table
  border-spacing: 10px 0

.v-simple-table td
  border: 1px solid #ccc !important
  border-collapse: collapse
  padding: 10px 0
.v-simple-table th
  border: 1px solid #ccc !important
  border-collapse: collapse
  font-weight: bold
</style>
