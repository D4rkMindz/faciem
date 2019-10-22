import Vue from 'vue';

// Register a Global Error Notification Toast.
Vue.toasted.register('error', 'An error occurred. Please try it again later', {
  type: 'error',
  icon: 'error_outline',
});
