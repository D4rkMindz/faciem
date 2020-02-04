import { Answer } from '@/domain/campaign/answer';
import { Question } from '@/domain/campaign/question';

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
    state.questions.forEach((question) => {
      if (!question.answers) {
        return;
      }
      question.answers.forEach((answer, i) => {
        question.answers[i] = new Answer(answer);
      });
      questions.push(new Question(question));
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
