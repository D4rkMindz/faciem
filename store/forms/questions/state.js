import { QUESTIONS_FORM_STATES } from '@/store/forms/questions/index';

export default function () {
  return {
    state: QUESTIONS_FORM_STATES.INITIAL,
    questions: [],
  };
}
