import {StorageService} from './utils/storage.service';
import {IntervalService} from './utils/interval.service';
import {checkUrl} from './utils/check-url';
import {PlayerPage} from './utils/player.page';

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
      this.player.src = this.url.value;
      this.storageService.setItem('last', this.url.value);
      this.storageService.addToRecent(this.url.value);
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
    return this;
  }
}
