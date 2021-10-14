import { Toast } from 'bootstrap';

interface CustomHTMLElement extends HTMLElement {
  find: (query: string) => HTMLElement;
}

export default class ToastService {
  private defaultConfig = {};

  private toastElement: CustomHTMLElement|undefined;

  private toast: Toast|undefined;

  constructor() {
    this.createToastElement();
  }

  // eslint-disable-next-line class-methods-use-this
  private createHTMLElement(tag: string, props: { [key: string]: string } = {}): CustomHTMLElement {
    const element = document.createElement(tag);
    Object.entries(props).forEach(([key, value]: [string, string]) => {
      element.setAttribute(key, value);
    });
    return element as CustomHTMLElement;
  }

  private createToastElement(): void {
    this.toastElement = this.createHTMLElement('div', {
      class: 'toast-container position-absolute p-3',
    });
    const toast = this.createHTMLElement('div', {
      class: 'toast align-items-center text-white bg-primary border-0 top-0 end-0',
      role: 'alert',
      'aria-live': 'assertive',
      'aria-atomic': 'true',
    });
    const divFlex = this.createHTMLElement('div', {
      class: 'd-flex',
    });
    const toastBody = this.createHTMLElement('div', {
      class: 'toast-body',
    });
    const button = this.createHTMLElement('button', {
      class: 'btn-close btn-close-white me-2 m-auto',
      type: 'button',
      'data-bs-dismiss': 'toast',
      'aria-label': 'Close',
    });
    divFlex.appendChild(toastBody);
    divFlex.appendChild(button);
    toast.appendChild(divFlex);
    this.toastElement.appendChild(toast);
    const content = document.body.querySelector('.content');
    if (content) {
      this.toastElement = this.createHTMLElement('div');
      this.toastElement.innerHTML = `<div role="alert" aria-live="assertive" aria-atomic="true" class="toast" data-bs-autohide="false">
      <div class="toast-header">
        <img src="..." class="rounded me-2" alt="...">
        <strong class="me-auto">Bootstrap</strong>
        <small>11 mins ago</small>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body">
        Hello, world! This is a toast message.
      </div>
    </div>`;
      content.appendChild(this.toastElement);
      this.toast = new Toast(this.toastElement as Element, {});
    }
  }

  private setContent(content: string|CustomHTMLElement): void {
    if (this.toastElement) {
      console.log(this.toastElement);
      const body = this.toastElement.querySelector('.toast-body');
      if (!body) return;
      if (typeof content === 'string') {
        body.innerHTML = content;
      } else {
        body.appendChild(content);
      }
    }
  }

  public showToast(content: string|CustomHTMLElement, customConfig = {}): void {
    this.setContent(content);
    // const config = { ...this.defaultConfig, ...customConfig };
    // const toast = new Toast(this.toastElement as Element, config);
    // console.log(toast);
    if (this.toast) {
      this.toast.show();
    }
  }
}
