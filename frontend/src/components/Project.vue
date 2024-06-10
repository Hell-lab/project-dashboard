<template>
  <div class="project">
    <h1>{{ project.name }}</h1>
    <p><strong>Category:</strong> {{ category.name }}</p>
    <p>{{ project.description }}</p>
    
    <h2>Team Members</h2>
    <ul>
      <li v-for="member in teamMembers" :key="member.userId">
        <router-link :to="'/users/' + member.userId">{{ member.User.displayName }}</router-link>
      </li>
    </ul>

    <h2>Project History</h2>
    <table>
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
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      project: {},
      category: {},
      teamMembers: [],
      statuses: [],
    };
  },
  async created() {
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
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
