import {
  navigateDesktop,
  navigateMobile,
  runOnDesktopViewports,
  runOnMobileViewports,
  runOnTabletViewports,
  startServer,
  visit,
} from '../../support/util';

describe('Signup', () => {
  beforeEach(visit);

  describe('using a local server', () => {
    beforeEach(startServer);
    //
    // describe('successful', () => {
    //   runOnAllDevices('signup a valid email address', '/signup', () => {
    //     cy.route('POST', 'https://venovum.dev/users/register', 'fixture:users/register.post.json').as('users/register');
    //
    //     cy.get('div.signup').find('input[type=email]').type('test@email.com');
    //     cy.get('div.signup').find('input[type=email]').should('have.class', 'ok');
    //
    //     cy.get('div.signup').find('button').should('not.be.disabled');
    //     cy.get('div.signup').find('button').click();
    //
    //     cy.wait('@users/register');
    //     cy.location().should((location) => {
    //       expect(location.pathname).to.eq('/signup/thank-you');
    //     });
    //   });
    // });
    //
    // describe('using an invalid email', () => {
    //   const emails = [
    //     'test@email.c',
    //     'test@c',
    //     '@email.com',
    //     't@.com',
    //   ];
    //
    //   emails.forEach((email) => {
    //     runOnAllDevices(email, '/signup', () => {
    //       cy.get('div.signup').find('input[type=email]').type(email);
    //       cy.get('div.signup').find('input[type=email]').should('have.class', 'error');
    //       cy.get('div.signup').find('input[type=email]').should('not.have.class', 'ok');
    //
    //       cy.get('div.signup').find('button').should('be.disabled');
    //       cy.get('div.signup').find('button').should('have.class', 'disabled');
    //     });
    //   });
    // });

    describe('using an already registered email', () => {
      runOnMobileViewports('test@email.com', () => {
        navigateMobile('/signup');
        cy.route('POST', 'https://venovum.dev/users/register', 'fixture:users/register.post.already-registered.json', { status: 422 }).as('users/register');

        cy.get('div.signup').find('input[type=email]').type('test@email.com');
        cy.get('div.signup').find('input[type=email]').should('have.class', 'ok');

        cy.get('div.signup').find('button').should('not.be.disabled');
        cy.get('div.signup').find('button').click();

        cy.wait('@users/register');

        cy.location().should((location) => {
          expect(location.pathname).to.eq('/signup');
        });

        cy.get('div.signup').find('button').should('have.class', 'disabled');
        cy.get('div.signup').find('button').should('be.disabled');
        cy.get('div.signup').find('.error-mobile').should('be.visible');
        cy.get('div.signup').find('input[type=email]').should('have.class', 'error');
        cy.get('div.signup').find('input[type=email]').should('not.have.class', 'ok');
        cy.get('div.signup').find('input[type=email]').type('.uk');
        cy.get('div.signup').find('input[type=email]').should('have.class', 'ok');
        cy.get('div.signup').find('input[type=email]').should('not.have.class', 'error');
        cy.get('div.signup').find('button').should('not.have.class', 'disabled');
        cy.get('div.signup').find('button').click();
      });
      runOnTabletViewports('test@email.com', () => {
        navigateMobile('/signup');
        cy.route('POST', 'https://venovum.dev/users/register', 'fixture:users/register.post.already-registered.json', { status: 422 }).as('users/register');

        cy.get('div.signup').find('input[type=email]').type('test@email.com');
        cy.get('div.signup').find('input[type=email]').should('have.class', 'ok');

        cy.get('div.signup').find('button').should('not.be.disabled');
        cy.get('div.signup').find('button').click();

        cy.wait('@users/register');

        cy.location().should((location) => {
          expect(location.pathname).to.eq('/signup');
        });

        cy.get('div.signup').find('button').should('have.class', 'disabled');
        cy.get('div.signup').find('button').should('be.disabled');
        cy.get('div.signup').find('.error-mobile').should('be.visible');
        cy.get('div.signup').find('input[type=email]').should('have.class', 'error');
        cy.get('div.signup').find('input[type=email]').should('not.have.class', 'ok');
        cy.get('div.signup').find('input[type=email]').type('.uk');
        cy.get('div.signup').find('input[type=email]').should('have.class', 'ok');
        cy.get('div.signup').find('input[type=email]').should('not.have.class', 'error');
        cy.get('div.signup').find('button').should('not.have.class', 'disabled');
        cy.get('div.signup').find('button').click();
      });
      runOnDesktopViewports('test@email.com', () => {
        navigateDesktop('/signup');
        cy.route('POST', 'https://venovum.dev/users/register', 'fixture:users/register.post.already-registered.json', { status: 422 }).as('users/register');

        cy.get('div.signup').find('input[type=email]').type('test@email.com');
        cy.get('div.signup').find('input[type=email]').should('have.class', 'ok');

        cy.get('div.signup').find('button').should('not.be.disabled');
        cy.get('div.signup').find('button').click();

        cy.wait('@users/register');

        cy.location().should((location) => {
          expect(location.pathname).to.eq('/signup');
        });

        cy.get('div.signup').find('button').should('have.class', 'disabled');
        cy.get('div.signup').find('button').should('be.disabled');
        cy.get('div.signup').find('.error-desktop').should('be.visible');
        cy.get('div.signup').find('input[type=email]').should('have.class', 'error');
        cy.get('div.signup').find('input[type=email]').should('not.have.class', 'ok');
        cy.get('div.signup').find('input[type=email]').type('.uk');
        cy.get('div.signup').find('input[type=email]').should('have.class', 'ok');
        cy.get('div.signup').find('input[type=email]').should('not.have.class', 'error');
        cy.get('div.signup').find('button').should('not.have.class', 'disabled');
        cy.get('div.signup').find('button').click();
      });
    });
  });
});
