import cloneDeep from 'lodash.clonedeep';
import { Answer } from '@/domain/campaign/answer';
import { Question } from '@/domain/campaign/question';
import StarsAnswer from '@/components/campaign/answer/StarsAnswer';
import MultipleChoiceAnswer from '@/components/campaign/answer/MultipleChoiceAnswer';
import TextAnswer from '@/components/campaign/answer/TextAnswer';

function extractType(type) {
  const map = {
    stars: StarsAnswer.name,
    'multiple-choice': MultipleChoiceAnswer.name,
    text: TextAnswer.name,
  };
  return map[type.toLowerCase()];
}

export default {
  /**
   * Get the video
   * @param state
   * @return {Question[]}
   */
  getQuestions: (state) => {
    if (!state.questions) {
      return [];
    }
    const questions = [];
    state.questions.forEach((q) => {
      const question = cloneDeep(q);
      if (question.answers) {
        question.answers.forEach((a, i) => {
          const answer = {
            id: a.id,
            text: a.answer,
            value: a.value,
            valid: true,
          };
          question.answers[i] = new Answer(answer);
        });
      }
      const data = {};
      data.id = question.id;
      data.type = extractType(question.question_type);
      data.text = question.question;
      data.value = '';
      data.answers = question.answers;
      questions.push(new Question(data));
    });

    return questions;
  },
  /**
   * Get the campaigns state
   * @param state
   * @return {*}
   */
  getQuestionsState: state => state.state,
};
