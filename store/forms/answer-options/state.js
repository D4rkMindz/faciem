import { ANSWER_OPTION_STATES } from '@/store/forms/answer-options/index';

export default function () {
  return {
    state: ANSWER_OPTION_STATES.INITIAL,
    answers: [],
  };
}

// TODO continue here with the forms (questions, answeroptions, campaign)
