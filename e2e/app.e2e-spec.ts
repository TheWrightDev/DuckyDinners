import { DuckyDinnersPage } from './app.po';

describe('ducky-dinners App', () => {
  let page: DuckyDinnersPage;

  beforeEach(() => {
    page = new DuckyDinnersPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to dd!');
  });
});
