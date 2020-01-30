import { WATCH_STATE } from '@/store/watch/media';

export default function () {
  return {
    questions: [],
    state: WATCH_STATE.INITIAL,
  };
}
