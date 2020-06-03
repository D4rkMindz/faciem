<template>
  <div class="container mx-auto">
    <h1 class="title">
      {{ $t('CAMPAIGNS.title') }}
    </h1>
    <nuxt-link :to="localeRoute('/b2b/campaigns/add')">
      <button class="button">
        {{ $t('CAMPAIGNS.create') }}
      </button>
    </nuxt-link>
    <div class="w-2/3">
      <table class="table-auto w-full">
        <thead>
          <tr>
            <th class="px-4 py-2">
              {{ $t('CAMPAIGNS.TABLE.name') }}
            </th>
            <th class="px-4 py-2">
              {{ $t('CAMPAIGNS.TABLE.started-at') }}
            </th>
            <th class="px-4 py-2">
              {{ $t('CAMPAIGNS.TABLE.ends-at') }}
            </th>
            <th class="px-4 py-2">
              {{ $t('CAMPAIGNS.TABLE.pricing') }}
            </th>
            <th class="px-4 py-2">
              {{ $t('CAMPAIGNS.TABLE.status') }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-if=" getState() === updatingState">
            <td colspan="5"
                class="text-center text-secondary">
              {{ $t('FORM.updating') }}
            </td>
          </tr>
          <tr v-for="(campaign, index) in getCampaigns()"
              :class="{ 'bg-gray-100': index % 2 === 0}">
            <td class="border px-4 py-2">
              {{ campaign.name }}
            </td>
            <td class="border px-4 py-2">
              {{ toMoment(campaign.start_at).format('DD.MM.YYYY') }}
            </td>
            <td class="border px-4 py-2">
              {{ campaign.end_at ? toMoment(campaign.end_at).format('DD.MM.YYYY'): $t('CAMPAIGNS.TABLE.open-end') }}
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
  middleware: [
    'auth',
    'campaign/view',
  ],
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
