import {
  Component,
  html,
  css,
  LitElement,
  async,
  OnInit,
  TemplateObservable,
  query,
  OnFirstUpdated
} from '@rxdi/lit-html';
import { BehaviorSubject, fromEvent, combineLatest, Observable } from 'rxjs';
import { map, filter, distinctUntilChanged, tap, scan } from 'rxjs/operators';

interface FeatureFlag {
  name: string;
  date: number;
}

interface MyHTMLElement extends HTMLElement {
  scrollTop: number;
  scrollHeight: number;
  clientHeight: number;
}
interface MyEvent extends Event {
  srcElement: MyHTMLElement;
}
/**
 * @customElement ff-table-component
 */
@Component({
  selector: 'ff-table-component',
  style: css`
    .container {
      font-family: 'Trebuchet MS', Arial, Helvetica, sans-serif;
      border-collapse: collapse;
      width: 100%;
      text-align: left;
    }

    .container td,
    .container th {
      border: 2px solid #ddd;
      padding: 5px;
      background-color: #c5c5c5;
      color: #212428;
    }

    .container tr:nth-child(even) {
      background-color: #f2f2f2;
    }

    .container tr:hover {
      background-color: aliceblue;
    }
    .container th {
      padding-top: 12px;
      padding-bottom: 12px;
      text-align: left;
      background-color: #4caf50;
      color: white;
    }

    .wrapper {
      height: 300px;
      overflow-y: auto;
    }
  `,
  template(this: FeatureFlagTableComponent) {
    return html`
      <div class="wrapper">
        <table class="container">
          <tr>
            <th>Feature Flag</th>
            <th>Date</th>
          </tr>
          ${this.tableTemplate}
        </table>
      </div>
    `;
  }
})
export class FeatureFlagTableComponent extends LitElement implements OnInit {
  public page$ = new BehaviorSubject(0);
  public offset$ = new BehaviorSubject(10);
  public wrapper = 300;
  public elementHeight = 30;

  private table: Observable<FeatureFlag[]> = combineLatest(this.page$, this.offset$).pipe(
    map(([page, offset]) => this.data.slice(page * offset, (page + 1) * offset)),
    scan((acc, curr) => [...acc, ...curr])
  );

  @TemplateObservable()
  private tableTemplate = this.table.pipe(
    map(v =>
      v.map(
        raw => html`
          <tr>
            <td>${raw.name}</td>
            <td>${raw.date}</td>
          </tr>
        `
      )
    )
  );
  data = Array(10000)
    .fill(null)
    .map((v, i) => ({ name: `${i}_test`, date: 6 }));

  @query('.wrapper')
  private container: HTMLDivElement;

  async OnInit() {
    // this.table.next(this.data.slice(0, 20));
  }

  firstUpdated() {
    fromEvent(this.container, 'scroll')
      .pipe(
        map(this.onListener),
        distinctUntilChanged(),
        filter(position => position > 99),
        tap(() => this.page$.next(this.page$ .getValue() + 1))
      ).subscribe(console.log)

      // this.page$.subscribe(console.log)
  }

  onListener = (event: MyEvent) => {
    return Math.round(
      (event.srcElement.scrollTop /
        (event.srcElement.scrollHeight - event.srcElement.clientHeight)) *
        100
    );
  };

  next() {
    // this.table.next(this.data);
  }

  previews() {}
}
