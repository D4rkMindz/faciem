
export class Question {
  id = null;
  value = null;
  language = 'en';
  errors = [];
  valid = false;
  type = 'text';
  answer = [];

  constructor() {
    this.id = Math.round(Math.random() * 1000);
  }
}

export const TEXT = 'text';
export const STARS = 'stars';
export const MULTIPLE_CHOICE = 'multiple-choice';
