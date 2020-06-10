import { LOCALES } from '@/domain/profile/locale';

export class Question {
  id = null;
  persisted = false;
  text = 'the question';
  value = null;
  locale = LOCALES.DEFAULT;
  errors = [];
  valid = false;
  type = 'text';

  constructor(data = { id: null, text: '', value: null, locale: LOCALES.DEFAULT, errors: [], valid: false, type: 'text' }) {
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
  }
}

export const TEXT = 'text';
export const STARS = 'stars';
export const MULTIPLE_CHOICE = 'multiple-choice';
export const VALIDATION = 'validation';
