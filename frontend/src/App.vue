<template>
  <v-app>
    <v-app-bar app color="white" elevate-on-scroll>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>
        <img src="./assets/oeh_logo.png" alt="Logo" height="60" />
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-login</v-icon>
      </v-btn>
    </v-app-bar>

    <v-row class="blue-bar">
      <v-col>
        <h1 class="display-2 font-weight-bold">Dashboard</h1>
      </v-col>
    </v-row>
    
    <v-main>
      <v-container>
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
                  <td>{{ project.category }}</td>
                  <td>{{ project.status }}</td>
                  <td>{{ project.statusInfo }}</td>
                  <td>{{ project.team.join(', ') }}</td>
                  <td>{{ project.lastUpdate }}</td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      showAddProjectSection: false,
      newProject: {
        name: '',
        description: '',
        category: '',
        team: []
      },
      teamMembers: ['Helena', 'Felix', 'Markus'],
      projects: [
        {
          name: 'Statue von Markus im TNF-Kammerl',
          description: 'Lebensgroße Marmorstatue von Markus, die zur Verherrlichung vor jedem StV-Café angebetet wird.',
          category: 'Internal',
          status: 'Rejected',
          statusInfo: 'WTF?!',
          team: ['Markus'],
          lastUpdate: '2024-04-06'
        },
        {
          name: 'Großbestellung Sternchen-Sticker',
          description: 'Vorrat aufstocken',
          category: 'Service',
          status: 'Completed',
          statusInfo: 'Können im Unterricht abgeholt werden.',
          team: ['Felix', 'Helena'],
          lastUpdate: '2024-04-05'
        }
      ]
    };
  },
  methods: {
    login() {
      // For demonstration purpose, assume successful login
      alert('Logged in successfully!');
    },
    toggleAddProjectSection() {
      this.showAddProjectSection = !this.showAddProjectSection;
    },
    addProject() {
      this.projects.push({ ...this.newProject, lastUpdate: new Date().toISOString().split('T')[0], status: 'New', statusInfo: 'Newly added' });
      this.newProject = { name: '', description: '', category: '', team: [] };
      alert('Project added successfully!');
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
      padding: 20px 0 /* Adjust padding as needed */
      display: flex
      align-items: center
  
  .blue-bar h1
    margin: 0
    color: #ffffff
    font-size: 5rem
    margin-left: 50px
  
  h1
    color: #000000

  .v-app-bar
    background-color: #ffffff !important
    border-bottom: 1px solid #ccc

  .v-btn--icon
    color: #f5a623
  
  .v-simple-table th 
    font-weight: bold
  
  
  .v-simple-table td
    border: 10px solid #ccc
  .v-simple-table th 
    border: 10px solid #ccc
</style>