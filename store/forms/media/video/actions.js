import { VIDEO_STATES } from '@/store/forms/media/video/index';

export default {
  /**
   * Save all answer options
   * @param commit
   * @param getters
   * @param {Video[]} videos
   * @param {int} campaignId
   * @return {Promise<void>}
   */
  async saveAnswerOptions({ commit, rootGetters }, { videos, campaignId }) {
    commit('setState', VIDEO_STATES.SAVING);
    let failed = false;
    const BreakException = {};
    try {
      await Promise.all(
        videos.map(async (video) => {
          const formData = new FormData();
          formData.append('video', video.url);
          formData.append('language', video.locale);
          formData.append('display_name', video.name);
          const userId = rootGetters['auth/getUserId'];
          const url = `/users/${userId}/campaigns/${campaignId}/media`;

          const response = await this.$axios.post(url, formData, {
            headers: {
              'Content-Type': 'application/octet-stream',
            },
          });
          if (response.status !== 200) {
            failed = true;
          }
        })
      );
      if (failed) {
        throw BreakException;
      }
      commit('setState', VIDEO_STATES.SAVED);
    } catch (e) {
      commit('setState', VIDEO_STATES.ERROR);
    }
  },
};
