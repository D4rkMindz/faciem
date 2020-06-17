import { LOCALES } from '@/domain/profile/locale';

/**
 * Class Media File
 */
export class MediaFile {
  /** @var {File|Object} file */
  file = null;
  valid = false;
  persisted = false;
  locale = LOCALES.DEFAULT;

  /**
   * media file constructor
   * @param file
   * @param locale
   * @param persisted
   */
  constructor(file, locale = LOCALES.DEFAULT, persisted = false) {
    this.file = file;
    this.locale = locale;
    this.persisted = persisted;
  }
}
