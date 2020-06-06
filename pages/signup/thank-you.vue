<template>
  <div class="container mx-auto">
    <div class="w-full lg:w-1/3 p-6 lg:float-right flex items-center lg:mr-32">
      <img :alt="$t('SIGNUP.check-inbox')"
           src="/img/mail-sent.svg" />
    </div>
    <div class="w-full lg:w-1/3 px-6 float-left">
      <h1 class="text-center lg:text-left title">
        {{ $t('SIGNUP.thanks') }}
      </h1>
      <p class="text">
        {{ $t('SIGNUP.check-inbox') }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignUpThankYouPage',
  head() {
    return {
      title: 'VENOVUM | ' + this.$t('HEAD.SIGNUP-THANKS.title'),
    };
  },
};
</script>
