import { LANGUAGE_STATES } from '@/domain/profile/language-states';
import { LOCALES } from '@/domain/profile/locale';

export default function () {
  return {
    state: LANGUAGE_STATES.INITIAL,
    locale: LOCALES.DEFAULT,
  };
}
