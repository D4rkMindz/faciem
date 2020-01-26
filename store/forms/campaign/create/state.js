import { Question } from '@/domain/campaign/question';
import { STATES } from '@/store/forms/campaign/create';

export default function () {
  return {
    campaign_id: null,
    pricing_id: null,
    language: null,
    questions: [new Question()],
    state: STATES.UNTOUCHED,
  };
};