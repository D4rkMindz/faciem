import { QUESTIONS_FORM_STATES } from '@/store/forms/questions/index';
import { Question } from '@/domain/campaign/question';

export default function () {
  return {
    state: QUESTIONS_FORM_STATES.INITIAL,
    questions: [new Question()],
  };
}
