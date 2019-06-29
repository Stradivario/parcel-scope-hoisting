import { html, Component, LitElement, css, query } from '@rxdi/lit-html';

interface MyHTMLElement extends HTMLElement {
  scrollTop: number;
  scrollHeight: number;
  clientHeight: number;
}

interface MyEvent extends Event {
  srcElement: MyHTMLElement;
}


/**
 * @customElement virtual-scroller
 */
@Component({
  selector: 'virtual-scroller',
  style: css`
    .wrapper {
      height: 300px;
      overflow-y: auto;
    }
  `,
  template(this: VirtualScrollerComponent) {
    return html`
      <div class="wrapper">
        <slot></slot>
      </div>
    `;
  }
})
export class VirtualScrollerComponent extends LitElement {
  @query('.wrapper')
  private container: HTMLDivElement;
     
  OnUpdateFirst() {
    this.container;
    debugger
  }
  onListener = (event: MyEvent) => {
    return Math.round(
      (event.srcElement.scrollTop /
        (event.srcElement.scrollHeight - event.srcElement.clientHeight)) *
        100
    );
  };
}
