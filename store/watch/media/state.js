import { WATCH_STATE } from '@/store/watch/media';

export default function () {
  return {
    media: null,
    state: WATCH_STATE.INITIAL,
  };
}
