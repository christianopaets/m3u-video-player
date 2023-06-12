export class Template {

  private _template: string;

  constructor(id: string) {
    const templateElement = document.querySelector(`template#${id}`);
    if (!templateElement) {
      throw new Error(`Template with id ${id} does not exist`);
    }
    this._template = templateElement.innerHTML;
  }

  interpolate(values: Record<string, string | number>): Template {
    const keys = Object.keys(values);
    this._template = keys.reduce((prev, current) => {
      const regex = new RegExp(`{{\s?${current}\s?}}`);
      return prev.replace(regex, `${values[current]}`);
    }, this._template);
    return this;
  }

  element<T extends HTMLElement>(): T {
    const div = document.createElement('div');
    div.innerHTML = this._template;
    return div.firstElementChild as T;
  }
}
