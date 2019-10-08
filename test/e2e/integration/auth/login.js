import {
  runOnDesktopViewports,
  runOnMobileViewports,
  runOnTabletViewports,
  startServer,
  visit,
} from '../../support/util';

describe('Login', () => {
  beforeEach(visit);

  describe('using a local server', () => {
    beforeEach(startServer);

    /**
     * Test the login for mobile views
     */
    runOnMobileViewports('should login a registered person', () => {
      cy.route('POST', 'https://venovum.dev/auth/login', 'fixture:auth/login.post.json').as('auth/login');

      cy.get('div.burger').click();
      cy.get('nav .overlay.shown').find('a[href="/login"]').click();

      cy.get('div.login').find('input[type=text]').type('admin');
      cy.get('div.login').find('input[type=password]').type('admin');
      cy.get('div.login').find('button').click();

      cy.wait('@auth/login');
      cy.location().should((location) => {
        expect(location.pathname).to.eq('/watch');
      });
    });
    /**
     * Test the login for tablet views
     */
    runOnTabletViewports('should login a registered person', () => {
      cy.route('POST', 'https://venovum.dev/auth/login', 'fixture:auth/login.post.json').as('auth/login');

      cy.get('div.burger').click();
      cy.get('nav .overlay.shown').find('a[href="/login"]').click();

      cy.get('div.login').find('input[type=text]').type('admin');
      cy.get('div.login').find('input[type=password]').type('admin');
      cy.get('div.login').find('button').click();

      cy.wait('@auth/login');
      cy.location().should((location) => {
        expect(location.pathname).to.eq('/watch');
      });
    });

    /**
     * Test the login for desktop views
     */
    runOnDesktopViewports('should login a registered person', () => {
      cy.route('POST', 'https://venovum.dev/auth/login', 'fixture:auth/login.post.json').as('auth/login');

      cy.get('.navigation-link').find('a[href="/login"]').click();

      cy.get('div.login').find('input[type=text]').type('admin');
      cy.get('div.login').find('input[type=password]').type('admin');
      cy.get('div.login').find('button').click();

      cy.wait('@auth/login');
      cy.location().should((location) => {
        expect(location.pathname).to.eq('/watch');
      });
    });
  });
});
