import { Answer } from '@/domain/campaign/answer';
import { Question } from '@/domain/campaign/question';

export default {
  /**
   * Get the video
   * @param state
   * @return {*}
   */
  getQuestions: (state) => {
    const questions = [];
    state.questions.forEach((question, i) => {
      question.answer.forEach((answer, i) => {
        question.answer[i] = new Answer(answer);
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
