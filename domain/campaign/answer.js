export class Answer {
  id = null;
  questionId = null;
  persisted = false;
  text = '';
  value = null;
  correct = false;
  errors = [];
  valid = false;

  constructor(data = { id: null, question_id: null, value: null, text: '', errors: [], valid: true, correct: false }) {
    if (!data.question_id) {
      throw new Error('question id not defined');
    }
    if (data.id === null) {
      data.id = Math.round(Math.random() * 1000);
    }
    this.id = data.id;
    this.questionId = data.question_id;
    this.value = data.value;
    this.text = data.text;
    this.errors = data.errors;
    this.valid = data.valid;
    this.correct = data.correct;
  }
}
