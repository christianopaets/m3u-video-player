export class IntervalService {
  private _interval: number | null = null;

  private static readonly _instance = new IntervalService();

  private constructor() {
  }

  static get instance(): IntervalService {
    return this._instance;
  }

  start(callback: () => void): void {
    this._interval = setInterval(() => {
      callback();
    }, 5000);
  }

  stop(): void {
    if (!this._interval) {
      return;
    }
    clearInterval(this._interval);
  }
}
