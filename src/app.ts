import {StorageService} from './utils/storage.service';
import {IntervalService} from './utils/interval.service';
import {checkUrl} from './utils/check-url';
import {PlayerPage} from './utils/player.page';
import {createRecentBlock} from './utils/recent-block';

export class App extends PlayerPage {

  private static readonly _instance: App = new App();

  private readonly storageService = StorageService.instance;

  private readonly intervalService = IntervalService.instance;

  private constructor() {
    super()
  }

  static get instance(): App {
    return this._instance;
  }

  listeners(): App {
    this.submit.addEventListener('click', () => {
      if (!checkUrl(this.url.value)) {
        return;
      }
      this._setVideo(this.url.value);
      this.storageService.addToRecent(this.url.value);
      this._generateRecentActivity();
      this.url.value = '';
    });
    this.player.addEventListener('loadeddata', () => {
      this.player.currentTime = this.storageService.getItem<number>(this.player.src, 0);
    });
    this.player.addEventListener('play', () => {
      this.intervalService.start(() => this.storageService.setItem(this.player.src, this.player.currentTime));
    });
    this.player.addEventListener('pause', () => {
      this.intervalService.stop();
    });
    return this;
  }

  init(): App {
    const lastVideo = this.storageService.getItem('last');
    if (lastVideo) {
      this.player.src = lastVideo;
    }
    this._generateRecentActivity();
    return this;
  }

  private _generateRecentActivity(): void {
    const recent = this.storageService.recent();
    if (!recent.length) {
      return;
    }
    this.recentActivityContainer.hidden = false;
    this.recentActivityContainerBar.innerHTML = '';
    recent.forEach(item => {
      const div = createRecentBlock(item);
      this.recentActivityContainerBar.append(div);
      const button = div.querySelector('.recent-activity-item-play')! as HTMLButtonElement;
      button.addEventListener('click', () => {
        this._setVideo(button.getAttribute('data-url')!);
      });
    });
  }

  private _setVideo(url: string): void {
    this.player.src = url;
    this.storageService.setItem('last', url);
  }
}
