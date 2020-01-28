import cloneDeep from 'lodash.clonedeep';
import moment from 'moment';
import {
  STATES,
  TYPES_THAT_REQUIRE_MULTIPLE_ANSWERS,
  TYPES_THAT_REQUIRE_NO_QUESTION,
  TYPES_THAT_REQUIRE_QUESTION,
} from '@/store/forms/campaign/create/index';

export default {
  /**
   * Save the form
   * @return {Promise<void>}
   */
  async saveForm({ state, getters, rootGetters, commit }, { file }) {
    if (!getters.isValid) {
      return;
    }
    const userId = rootGetters['auth/getUserId'];

    try {
      commit('setState', STATES.SAVING);
      if (state.campaign_id === null) {
        const saveCampaignResponse = await this.$axios.post(
          `/users/${userId}/campaigns`, {
            name: 'campaign',
            description: 'Some description',
            start: moment().format('YYYY-MM-DD HH:mm:ss'),
            end: null,
            pricing_id: state.pricing_id,
            questions: state.questions,
          });
        if (saveCampaignResponse.status !== 200) {
          commit('setState', STATES.INVALID);
          commit('setErrors', { errors: [], message: 'Something went wrong. Please try again' });
          return;
        }
        commit('setCampaignId', saveCampaignResponse.data.campaign_id);
      }

      const formData = new FormData();

      debugger;
      formData.append('video', file);
      formData.append('language', 'de');
      formData.append('display_name', file.name);
      const url = `/users/${userId}/campaigns/${state.campaign_id}/media`;

      const saveMediaResponse = await this.$axios.post(
        url,
        formData,
        {
          headers: {
            'Content-Type': 'application/octet-stream',
          },
        }
      );
      if (saveMediaResponse.status !== 200) {
        commit('setState', STATES.INVALID);
        commit('setErrors', { errors: [], message: 'Something went wrong. Please try again' });
        return;
      }
      this.$toast.info('File uploaded and enqueued for processing. This may take some time');
      commit('reset');
      this.$router.replace('/b2b/campaigns');
    } catch (e) {
      commit('setState', STATES.INVALID);
      if ('response' in e && 'errors' in e.response.data) {
        const data = e.response.data;
        commit('setErrors', { errors: data.errors, message: data.message });
      }
    }
  },
  /**
   * Validate a question
   * @param commit
   * @param state
   * @param questionIndex
   */
  validateQuestion({ commit, state }, { questionIndex }) {
    const question = cloneDeep(state.questions[questionIndex]);

    question.errors = [];

    if (!TYPES_THAT_REQUIRE_QUESTION.includes(question.type)) {
      question.valid = true;
      commit('setQuestion', questionIndex, question);
      return;
    }

    if (TYPES_THAT_REQUIRE_NO_QUESTION.includes(question.type)) {
      question.answer = [];
    }

    if (!question.value || question.value.trim().length < 3) {
      question.errors.push('Please enter at least a 3 characters long question');
    }

    question.valid = question.errors.length === 0;
    commit('setQuestion', { questionIndex, question });
  },
  /**
   * Validate an answer
   * @param commit
   * @param state
   * @param questionIndex
   * @param answerIndex
   */
  validateAnswer({ commit, state }, { questionIndex, answerIndex }) {
    const question = cloneDeep(state.questions[questionIndex]);
    const answer = question.answer[answerIndex];

    answer.errors = [];

    if (TYPES_THAT_REQUIRE_MULTIPLE_ANSWERS.includes(question.type) && question.answer.length <= 1) {
      question.answer[question.answer.length - 1].errors.push('Please add more than one answer option');
      question.answer[question.answer.length - 1].valid = false;
    }

    if (!answer.value || answer.value.trim().length < 1) {
      answer.errors.push('Please enter at least a one character long answer');
    }
    answer.valid = answer.errors.length === 0;

    commit('setQuestion', { questionIndex, question });
  },
};
