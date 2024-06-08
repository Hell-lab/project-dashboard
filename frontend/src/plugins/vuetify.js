// plugins/vuetify.js

import { createVuetify } from 'vuetify';
import 'vuetify/styles'; // Import Vuetify styles
import '@mdi/font/css/materialdesignicons.min.css'; // Import Material Design Icons
import '@fortawesome/fontawesome-free/css/all.css'; // Import FontAwesome

// Setup Vuetify with the icon sets and any additional configuration
export default createVuetify({
  icons: {
    defaultSet: 'mdi', // Default icon set
    aliases: {
      // Add custom aliases if necessary
    },
    sets: {
      mdi: {
        component: 'mdi', // Use Material Design Icons
      },
      fa: {
        component: 'fa', // Use FontAwesome
      },
    },
  },
});
