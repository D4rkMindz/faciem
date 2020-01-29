<template>
  <div class="container mx-auto">
    <h1 class="title">
      Campaigns
    </h1>
    <nuxt-link to="/b2b/campaigns/add">
      <button class="button">
        Create a campaign
      </button>
    </nuxt-link>
    <div class="w-2/3">
      <table class="table-auto w-full">
        <thead>
          <tr>
            <th class="px-4 py-2">
              Name
            </th>
            <th class="px-4 py-2">
              Started at
            </th>
            <th class="px-4 py-2">
              Ends at
            </th>
            <th class="px-4 py-2">
              Pricing
            </th>
            <th class="px-4 py-2">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-if=" getState() === updatingState">
            <td colspan="5"
                class="text-center text-secondary">
              Updating ...
            </td>
          </tr>
          <tr v-for="(campaign, index) in getCampaigns()"
              :class="{ 'bg-gray-100': index % 2 === 0}">
            <td class="border px-4 py-2">
              {{ campaign.name }}
            </td>
            <td class="border px-4 py-2">
              {{ toMoment(campaign.started_at).format('DD.MM.YYYY') }}
            </td>
            <td class="border px-4 py-2">
              {{ campaign.ends_at ? toMoment(campaign.ends_at).format('DD.MM.YYYY'): 'Open end' }}
            </td>
            <td class="border px-4 py-2">
              {{ campaign.pricing_name }}
            </td>
            <td class="border px-4 py-2">
              {{ campaign.status }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>

import { createNamespacedHelpers } from 'vuex';
import moment from 'moment';
import { CAMPAIGNS_STATE } from '@/store/campaigns';
const { mapGetters, mapActions } = createNamespacedHelpers('campaigns');
export default {
  name: 'CampaignPage',
  computed: {
    updatingState() {
      return CAMPAIGNS_STATE.UPDATING;
    },
  },
  mounted() {
    this.update();
  },
  methods: {
    ...mapGetters([
      'getCampaigns',
      'getState',
    ]),
    ...mapActions([
      'update',
    ]),
    toMoment(date) {
      return moment(date);
    },
  },
};
</script>

<style scoped>

</style>
