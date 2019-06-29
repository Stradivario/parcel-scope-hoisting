import { html, LitElement, Component} from '@rxdi/lit-html';

/**
 * @customElement app-component
 */
@Component({
  selector: 'app-component',
  template(this: AppComponent) {
    return html`
      <home-component></home-component>
    `;
  },
  container: document.body
})
export class AppComponent extends LitElement {}
