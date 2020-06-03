<template>
  <div class="container mx-auto">
    <h1 class="title">
      {{ $t('ADMIN.welcome',{ username: username}) }}
      <!--      Welcome {username}-->
    </h1>
    <div class="sm:w-1/1 md:w-1/3">
      <h3>{{ $t('ADMIN.campaigns') }}</h3>
      <nuxt-link :to="localeRoute('/b2b/campaigns')">
        <button class="button">
          {{ $t('ADMIN.see-all-campaigns') }}
        </button>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  middleware: [
    'auth',
  ],
  name: 'AdminPage',
  computed: {
    username() {
      // todo get username properly
      return 'Admin';
    },
  },
};
</script>
