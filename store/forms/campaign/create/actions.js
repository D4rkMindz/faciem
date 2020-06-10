import moment from 'moment';
import {
  CAMPAIGN_CREATE_STATES,
} from '@/store/forms/campaign/create/index';

export default {
  /**
   * Save the form
   * @return {Promise<void>}
   */
  async saveForm({ state, getters, rootGetters, commit, dispatch }, { file }) {
    if (!getters.isValid) {
      return;
    }
    const userId = rootGetters['auth/getUserId'];

    try {
      commit('setState', CAMPAIGN_CREATE_STATES.SAVING);
      if (state.campaign_id === null) {
        const response = await this.$axios.post(
          `/users/${userId}/campaigns`, {
            name: state.name,
            description: state.description,
            start: moment().format('YYYY-MM-DD HH:mm:ss'),
            end: null,
            pricing_id: state.pricing_id,
          });
        if (response.status !== 200) {
          commit('setState', CAMPAIGN_CREATE_STATES.INVALID);
          commit('setErrors', { errors: [], message: this.$i18n.t('ERRORS.generic') });
          return;
        }
        commit('setCampaignId', response.data.campaign_id);
      }
    } catch (e) {
      commit('setState', CAMPAIGN_CREATE_STATES.INVALID);
      if ('response' in e && 'errors' in e.response.data) {
        const data = e.response.data;
        commit('setErrors', { errors: data.errors, message: data.message });
      }
    }
  },
  /**
   * Validate the name
   * @param commit
   * @param state
   * @param name
   */
  validateName({ commit, state }, name) {
    const errors = [];
    if (!name) {
      errors.push(this.$i18n.t('ERRORS.required', { field: this.$i18n.t('CREATECAMPAIGN.name') }));
      commit('setNameErrors', errors);
      return;
    }

    if (name.length < 3) {
      errors.push(this.$i18n.t('ERRORS.minimum-length', { field: this.$i18n.t('CREATECAMPAIGN.name'), minimum: 3 }));
    }
    if (name.length > 20) {
      errors.push(this.$i18n.t('ERRORS.maximum-length', { field: this.$i18n.t('CREATECAMPAIGN.name'), minimum: 20 }));
    }

    commit('setNameErrors', errors);
  },
  /**
   * Validate the description
   * @param commit
   * @param state
   * @param description
   */
  validateDescription({ commit, state }, description) {
    const errors = [];

    if (!description) {
      errors.push(this.$i18n.t('ERRORS.required', { field: this.$i18n.t('CREATECAMPAIGN.description') }));
      commit('setDescriptionErrors', errors);
      return;
    }

    if (description.length < 10) {
      errors.push(this.$i18n.t('ERRORS.minimum-length', { field: this.$i18n.t('CREATECAMPAIGN.description'), minimum: 10 }));
    }
    if (description.length > 200) {
      errors.push(this.$i18n.t('ERRORS.maximum-length', { field: this.$i18n.t('CREATECAMPAIGN.description'), minimum: 200 }));
    }

    commit('setDescriptionErrors', errors);
  },
};
