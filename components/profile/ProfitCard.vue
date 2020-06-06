<template>
  <div class="bg-white shadow mx-auto p-6 rounded flex items-center">
    <div class="mx-auto">
      <span>{{ $t('PROFIT.title') }}</span>
      <h1 v-if="fetched"
          class="font-bold text-3xl">
        {{ amount }}
      </h1>
      <h1 v-if="loading"
          class="font-bold text-3xl">
        ...
      </h1>
      <h1 v-if="failed"
          class="font-bold error">
        {{ $t('PROFIT.error') }}
      </h1>
    </div>
  </div>
</template>

<script>
import Dinero from 'dinero.js';
import { createNamespacedHelpers } from 'vuex';
import { BALANCE_STATES } from '@/domain/profile/balance-states';
const { mapGetters, mapActions } = createNamespacedHelpers('profile/balance');

export default {
  name: 'ProfileCard',
  computed: {
    loading() {
      return this.getState() === BALANCE_STATES.INITIAL || this.getState() === BALANCE_STATES.FETCHING;
    },
    fetched() {
      return this.getState() === BALANCE_STATES.FETCHED;
    },
    failed() {
      return this.getState() === BALANCE_STATES.FAILED;
    },
    amount() {
      const balance = this.getBalance();
      return this.toCurrency(balance.amount, balance.currency);
    },
  },
  mounted() {
    this.refreshBalance();
  },
  methods: {
    ...mapGetters(['getState', 'getBalance']),
    ...mapActions(['refreshBalance']),
    toCurrency(amount, currency = 'CHF') {
      return Dinero({ amount: amount, currency: currency }).toFormat();
    },
  },
};
</script>
