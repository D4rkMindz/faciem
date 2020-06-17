export class Answer {
  id = null;
  questionId = null;
  persisted = false;
  text = '';
  value = null;
  correct = false;
  errors = [];
  valid = false;

  constructor(data = { id: null, questionId: null, value: null, text: '', errors: [], valid: true, correct: false }) {
    if (!data.questionId) {
      throw new Error('question id not defined');
    }
    if (!data.id) {
      data.id = Math.round(Math.random() * 1000);
    }
    this.id = data.id;
    this.questionId = data.questionId;
    this.value = data.value || null;
    this.text = data.text || '';
    this.errors = data.errors || [];
    this.valid = data.valid || false;
    this.correct = data.correct || false;
  }
}
