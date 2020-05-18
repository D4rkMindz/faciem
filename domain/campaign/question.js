
export class Question {
  id = null;
  text = 'the question';
  value = null;
  language = 'en';
  errors = [];
  valid = false;
  type = 'text';
  answers = [];

  constructor(data = { id: null, text: 'the question', value: null, language: 'en', errors: [], valid: false, type: 'text', answers: [] }) {
    if (data.id === null) {
      data.id = Math.round(Math.random() * 1000);
    }
    this.id = data.id;
    this.value = data.value;
    this.text = data.text;
    this.language = data.language;
    this.errors = data.errors;
    this.valid = data.valid;
    this.type = data.type;
    this.answers = data.answers;
  }
}

export const TEXT = 'text';
export const STARS = 'stars';
export const MULTIPLE_CHOICE = 'multiple-choice';
export const VALIDATION = 'validation';
