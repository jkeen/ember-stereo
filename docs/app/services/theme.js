import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

const STORAGE_KEY = 'ember-stereo-docs:theme';

export default class ThemeService extends Service {
  @tracked preference = this.storedPreference;

  get storedPreference() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  get systemPrefersDark() {
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
  }

  get isDark() {
    return this.preference
      ? this.preference === 'dark'
      : this.systemPrefersDark;
  }

  toggle() {
    this.preference = this.isDark ? 'light' : 'dark';

    document.documentElement.dataset.theme = this.preference;

    try {
      localStorage.setItem(STORAGE_KEY, this.preference);
    } catch (e) {
      // A browser with storage disabled still gets the toggle for this session.
    }
  }
}
