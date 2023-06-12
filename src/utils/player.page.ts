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
}
