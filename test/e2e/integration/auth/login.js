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

      cy.get('nav div.burger').click();
      cy.get('nav .overlay.shown a[href="/login"]').click();
      cy.get('div.container.mx-auto > input[type=text]').type('admin');
      cy.get('div.container.mx-auto > input[type=password]').type('admin');
      cy.get('div.container.mx-auto > button').click();
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

      cy.get('nav div.burger').click();
      cy.get('nav .overlay.shown a[href="/login"]').click();
      cy.get('div.container.mx-auto > input[type=text]').type('admin');
      cy.get('div.container.mx-auto > input[type=password]').type('admin');
      cy.get('div.container.mx-auto > button').click();
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

      cy.get('nav [desktop-navigation] a[href="/login"]').click();
      cy.get('div.container.mx-auto > input[type=text]').type('admin');
      cy.get('div.container.mx-auto > input[type=password]').type('admin');
      cy.get('div.container.mx-auto > button').click();
      cy.wait('@auth/login');
      cy.location().should((location) => {
        expect(location.pathname).to.eq('/watch');
      });
    });
  });
});
