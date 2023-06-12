export class PlayerPage {

  get player(): HTMLVideoElement {
    return document.getElementById('player') as HTMLVideoElement;
  }

  get url(): HTMLTextAreaElement {
    return document.getElementById('video-url') as HTMLTextAreaElement;
  }

  get submit(): HTMLButtonElement {
    return document.getElementById('controls-submit') as HTMLButtonElement;
  }

  get recentActivityContainer(): HTMLDivElement {
    return document.getElementById('recent-activity') as HTMLDivElement;
  }

  get recentActivityContainerBar(): HTMLDivElement {
    return document.getElementById('recent-activity-bar') as HTMLDivElement;
  }
}
