<template>
  <div class="container mx-auto">
    <h1 class="title">
      Welcome {{ username }}
    </h1>
    <div class="sm:w-1/1 md:w-1/3">
      <h3>Campaigns</h3>
      <nuxt-link to="/b2b/campaigns">
        <button class="button">
          See all campaigns
        </button>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminPage',
  computed: {
    username() {
      // todo get username properly
      return 'Admin';
    },
  },
};
</script>
