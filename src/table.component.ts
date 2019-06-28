import { Component, html, css, LitElement, async, OnInit } from '@rxdi/lit-html';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

interface FeatureFlag {
  name: string;
  date: number;
}

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
      border: 1px solid #ddd;
      padding: 8px;
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
  `,
  template(this: FeatureFlagTableComponent) {
    return html`
      <table class="container">
        <tr>
          <th>Feature Flag</th>
          <th>Date</th>
        </tr>
        ${async(
          this.table.pipe(
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
          )
        )}
      </table>
    `;
  }
})
export class FeatureFlagTableComponent extends LitElement implements OnInit {
  private table: BehaviorSubject<FeatureFlag[]> = new BehaviorSubject([]);

  async OnInit() {
    this.table.next([{ name: 'Dossier', date: Date.now() }]);
  }
}
