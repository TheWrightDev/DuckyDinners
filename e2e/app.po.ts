import { browser, by, element } from 'protractor';

export class DuckyDinnersPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('dd-root h1')).getText();
  }
}
