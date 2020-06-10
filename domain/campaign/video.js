import { LOCALES } from '@/domain/profile/locale';

export class Video {
  id = null;
  locale = LOCALES.DEFAULT;
  campaignId = null;
  name = null;
  url = null;
  quality = null;
  duration = null;
  extension = null;

  constructor(data = { id: null, locale: LOCALES.DEFAULT, campaign_id: null, name: null, file: null, quality: null, duration: null, extension: null }) {
    this.id = data.id;
    this.locale = data.locale;
    this.campaignId = data.campaign_id;
    this.name = name;
    this.file = data.file;
    this.quality = data.quality;
    this.duration = data.duration;
    this.extension = data.extension;
  }
}
