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
      const date = new Intl.DateTimeFormat('en-US', {
        dateStyle: 'full',
        timeStyle: 'short'
      }).format(item.date)
      const div = document.createElement('div');
      div.classList.add('recent-activity-item');
      div.innerHTML = `
        <div class="recent-activity-item-title">
          <span class="recent-activity-item-headline">Last played on</span>
          <span class="recent-activity-item-supporting">${date}</span>
        </div>
        <button class="recent-activity-item-play" data-url="${item.url}">
          <svg viewBox="0 0 24 24">
            <use href="#play"/>
          </svg>
        </button>
        <hr>
      `;
      this.recentActivityContainerBar.append(div);
      const button = div.querySelector('.recent-activity-item-play')! as HTMLButtonElement;
      button.addEventListener('click', () => {
        const url = button.getAttribute('data-url')!;
        this._setVideo(url);
      });
    });
  }

  private _setVideo(url: string): void {
    this.player.src = url;
    this.storageService.setItem('last', url);
  }
}
