import { Answer } from '@/domain/campaign/answer';

export class Question {
  id = null;
  value = null;
  language = 'en-US';
  errors = [];
  valid = false;
  type = 'text';
  answer = [];

  constructor() {
    this.id = Math.random() * 1000;
    this.answer.push(new Answer());
  }
}

export const TEXT = 'text';
export const STARS = 'stars';
export const APPROVAL = 'approval';
export const MULTIPLE_CHOICE = 'multiple_choice';
