import {Template} from '../utils/template';

export class Recent {
  date: number;
  url: string;

  private _element: HTMLDivElement | undefined;

  constructor(date: number, url: string) {
    this.date = date;
    this.url = url;
  }

  get formattedDate(): string {
    return new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'short'}).format(this.date);
  }

  get element(): HTMLDivElement {
    if (!this._element) {
      this._element = new Template('recent-activity-template')
        .interpolate({url: this.url, date: this.formattedDate})
        .element<HTMLDivElement>();
    }
    return this._element;
  }

  get button(): HTMLButtonElement {
    return this.element.querySelector('.recent-activity-item-play')!;
  }
}
