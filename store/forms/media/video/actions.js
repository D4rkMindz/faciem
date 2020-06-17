import { VIDEO_STATES } from '@/store/forms/media/video/index';

export default {

  /**
   *
   * @param commit
   * @param getters
   * @param rootGetters
   * @param dispatch
   * @param {MediaFile[]} mediaFiles
   * @return {Promise<void>}
   */
  async saveVideoFiles({ commit, getters, rootGetters, dispatch }, mediaFiles) {
    commit('setState', VIDEO_STATES.EDITED);
    if (!rootGetters['forms/campaign/create/isValid'] || !rootGetters['forms/campaign/create/getCampaignId']) {
      commit('setState', VIDEO_STATES.INVALID);
      return;
    }

    let failed = false;
    const BreakException = {};
    commit('setState', VIDEO_STATES.SAVING);
    await Promise.all(mediaFiles.map(async (mediaFile, index) => {
      try {
        if (!mediaFile.valid) {
          throw BreakException;
        }
        if (mediaFile.persisted) {
          return;
        }

        // TODO think about option that a user might change the file and uploads another video for the same language (unlock it)
        const campaignId = rootGetters['forms/campaign/create/getCampaignId'];
        const userId = rootGetters['auth/getUserId'];
        const formData = new FormData();

        formData.append('video', mediaFile.file);
        formData.append('language', mediaFile.locale);
        formData.append('display_name', mediaFile.file.name);
        const url = `/users/${userId}/campaigns/${campaignId}/media`;

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
          failed = true;
          return;
        }
        mediaFiles.splice(index, 1);
        mediaFile.file = null;
        mediaFile.persisted = true;
        dispatch('campaigns/update', null, { root: true });
      } catch (e) {
        failed = true;
        mediaFile.persisted = false;
      }
    }));

    if (!failed) {
      commit('setState', VIDEO_STATES.SAVED);
      this.$toast.info(this.$i18n.t('CAMPAIGN.media-files-uploaded-success'));
    } else {
      commit('setState', VIDEO_STATES.ERROR);
      this.$toast.info(this.$i18n.t('ERRORS.media-files-not-uploaded'));
    }

    return failed;
  },
};
