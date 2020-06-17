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
    debugger;
    if (!rootGetters['forms/campaign/create/isValid'] || !rootGetters['forms/campaign/create/getCampaignId']) {
      return;
    }

    let failed = false;
    const BreakException = {};
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
      this.$toast.info(this.$i18n.t('CAMPAIGN.media-files-uploaded-success'));
    } else {
      this.$toast.info(this.$i18n.t('ERRORS.media-files-not-uploaded'));
    }

    return failed;
  },
};
