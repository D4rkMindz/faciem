import { QUESTIONS_STATE } from '@/store/watch/questions/index';
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
function parseQuestions(q) {
  if (!q) {
    return [];
  }
  const questions = [];
  q.forEach((question) => {
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
}

export default {
  async getQuestionsForMedia({ commit, rootGetters }, campaignId) {
    commit('setState', QUESTIONS_STATE.LOADING);
    try {
      const url = `/campaigns/${campaignId}/questions`;
      const response = await this.$axios.get(url);
      if (response.status !== 200) {
        commit('setState', QUESTIONS_STATE.ERROR);
        return;
      }
      commit('setQuestions', parseQuestions(response.data.questions));
      commit('setState', QUESTIONS_STATE.LOADED);
    } catch (e) {
      commit('setState', QUESTIONS_STATE.ERROR);
    }
  },
};
