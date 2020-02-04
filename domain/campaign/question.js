
export class Question {
  id = null;
  value = null;
  language = 'en';
  errors = [];
  valid = false;
  type = 'text';
  answer = [];

  constructor(data = { id: null, value: null, language: 'en', errors: [], valid: false, type: 'text', answer: [] }) {
    if (data.id === null) {
      data.id = Math.round(Math.random() * 1000);
    }
    this.id = data.id;
    this.value = data.value;
    this.language = data.language;
    this.errors = data.errors;
    this.valid = data.valid;
    this.type = data.type;
    this.answer = data.answer;
  }
}

export const TEXT = 'text';
export const STARS = 'stars';
export const MULTIPLE_CHOICE = 'multiple-choice';
