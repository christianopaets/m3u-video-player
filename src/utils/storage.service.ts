import {Recent} from '../interfaces/recent.interface';

export class StorageService {

  private static readonly _instance = new StorageService();
  private readonly _prefix = 'm3u';

  private constructor() {
  }

  static get instance(): StorageService {
    return this._instance;
  }

  setItem<T = string>(key: string, value: T): void {
    localStorage.setItem(`${this._prefix}:${key}`, JSON.stringify(value));
  }

  getItem<T = string>(key: string): T | null;
  getItem<T = string>(key: string, defaultValue: T): T;
  getItem<T = string>(key: string, defaultValue: T | null = null): T | null {
    const jsonString = localStorage.getItem(`${this._prefix}:${key}`);
    if (!jsonString) {
      return defaultValue;
    }
    try {
      return JSON.parse(jsonString);
    } catch {
      return defaultValue;
    }
  }

  addToRecent(url: string): void {
    const recent = this.getItem<Recent[]>('recent', []);
    recent.unshift({
      url,
      date: Date.now()
    })
    this.setItem('recent', recent);
  }
}
