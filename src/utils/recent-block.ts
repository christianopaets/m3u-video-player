import {Recent} from '../interfaces/recent.interface';

export function createRecentBlock(recent: Recent): HTMLDivElement {
  const date = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
    timeStyle: 'short'
  }).format(recent.date);
  const div = document.createElement('div');
  div.classList.add('recent-activity-item');
  div.innerHTML = `
        <div class="recent-activity-item-title">
          <span class="recent-activity-item-headline">Last played on</span>
          <span class="recent-activity-item-supporting">${date}</span>
        </div>
        <button class="recent-activity-item-play" data-url="${recent.url}">
          <svg viewBox="0 0 24 24">
            <use href="#play"/>
          </svg>
        </button>
        <hr>
      `;
  return div;
}
