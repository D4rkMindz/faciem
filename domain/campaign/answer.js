export class Answer {
  id = null;
  text = '';
  value = null;
  correct = false;
  errors = [];
  valid = false;

  constructor(data = { id: null, value: null, text: '', errors: [], valid: true, correct: false }) {
    if (data.id === null) {
      data.id = Math.round(Math.random() * 1000);
    }
    this.id = data.id;
    this.value = data.value;
    this.text = data.text;
    this.errors = data.errors;
    this.valid = data.valid;
    this.correct = data.correct;
  }
}
