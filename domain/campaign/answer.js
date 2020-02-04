export class Answer {
  value = null;
  errors = [];
  valid = false;

  constructor(data = { value: null, errors: [], valid: true }) {
    this.value = data.value;
    this.errors = data.errors;
    this.valid = data.valid;
  }
}
