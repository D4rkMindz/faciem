import { LOCALES } from '@/domain/profile/locale';

export class QuestionWithAnswers {
  id = null;
  persisted = false;
  text = 'the question';
  value = null;
  locale = LOCALES.DEFAULT;
  errors = [];
  valid = false;
  type = 'text';
  position = 1;
  campaignId = null;
  answers = [];

  constructor(data = { id: null, text: '', value: null, locale: LOCALES.DEFAULT, errors: [], valid: false, type: 'text', campaign_id: null, position: 1, answers: [] }) {
    if (!data.id) {
      data.id = Math.round(Math.random() * 1000);
    }
    this.id = data.id;
    this.value = data.value || null;
    this.text = data.text || '';
    this.locale = data.locale || LOCALES.DEFAULT;
    this.errors = data.errors || [];
    this.valid = data.valid || false;
    this.type = data.type || 'text';
    this.position = data.position || 1;
    this.campaignId = data.campaign_id || null;
    this.answers = data.answers || [];
  }
}
