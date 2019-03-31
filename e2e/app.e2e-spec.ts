import { BbimsPage } from './app.po';

describe('bbims App', function() {
  let page: BbimsPage;

  beforeEach(() => {
    page = new BbimsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
