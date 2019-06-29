import { Container, createTestBed } from '@rxdi/core';
import { HomeComponent } from './home.component';


describe('HomeComponent', () => {
  beforeAll(async () => {
    await createTestBed({
      components: [HomeComponent]
    }).toPromise();
  });

  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  it('should be defined', done => {
    expect(Container.has(HomeComponent)).toBeTruthy();
    done();
  });

  it('displays greeting', () => {
    const element = Container.get(HomeComponent);
    element['render']();
    document.body.appendChild(element);
    const div = document.querySelector('home-component');
    expect(div.textContent).toBe('');
  });
});
