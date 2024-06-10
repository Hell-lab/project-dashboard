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
                  <v-text-field
                    v-model="newProject.category"
                    label="Category"
                    required
                  ></v-text-field>
                  <v-select
                    v-model="newProject.team"
                    :items="teamMembers"
                    label="Team"
                    multiple
                    required
                  ></v-select>
                  <v-btn type="submit">Add Project</v-btn>
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
                  <th>Status Information</th>
                  <th>Team</th>
                  <th>Last Update</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="project in projects" :key="project.name">
                  <td>{{ project.name }}</td>
                  <td>{{ project.description }}</td>
                  <!--<td>{{ project.category }}</td>
                  <td>{{ project.status }}</td>
                  <td>{{ project.statusInfo }}</td>
                  <td>{{ project.team.join(', ') }}</td>
                  <td>{{ project.lastUpdate }}</td>-->
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
            category: '',
            team: []
        },
        projects: [],
        teamMembers: ['Alice', 'Bob', 'Charlie'], // Example team members, replace with actual data
        };
    },
    created() {
        this.fetchProjects();
    },
    methods: {
        toggleAddProjectSection() {
        this.showAddProjectSection = !this.showAddProjectSection;
        },
        fetchProjects() {
        axios.get('http://localhost:3000/api/projects')
            .then(response => {
            this.projects = response.data;
            })
            .catch(error => {
            console.error('There was an error fetching the projects!', error);
            });
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
        border: 1px solid #ccc  !important
        border-collapse: collapse
        font-weight: bold
</style>
    