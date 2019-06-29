import { html, LitElement, Component, query, TemplateResult, TemplateObservable, Template } from '@rxdi/lit-html';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';


export const Images = () => html`<div></div>`;


/**
 * @customElement home-component
 */
@Component({
  selector: 'home-component',
  template(this: HomeComponent) {
    return html`
    ${this.templateObservable}
    `;
  }
})
export class HomeComponent extends LitElement {

  loaded: Subject<TemplateResult> = new Subject();
  @TemplateObservable()
  private templateObservable = this.loaded;

  OnInit() {
    let counter = 0
    setInterval(() => {
      counter++;
      this.loaded.next(this.generateTemplate(counter))
    }, 500)
  }

  generateTemplate(name) {
    return html`
    <virtual-scroller>
       <div>
       ${name}
       </div>
     </virtual-scroller>
 `
  }
}
