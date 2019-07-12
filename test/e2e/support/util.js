/**
 * Visit the home page
 */
export function visit() {
  cy.visit('/');
}

/**
 * Start the mock server
 */
export function startServer() {
  cy.server();
}

/**
 * Run tests on all viewports
 * @param {string} name The name of the test
 * @param callback The callback that is called with the tested viewport
 */
export function runOnAllViewports(name, callback) {
  const viewports = ['macbook-15', 'macbook-13', 'macbook-11', 'ipad-2', 'ipad-mini', 'iphone-6+', 'iphone-6', 'iphone-5', 'iphone-4', 'iphone-3'];
  runViewports(name, viewports, callback);
}

/**
 * Run tests on Mobile viewports
 * @param {string} name The name of the test
 * @param callback The callback that is called with the tested viewport
 */
export function runOnMobileViewports(name, callback) {
  const viewports = ['iphone-6+', 'iphone-6', 'iphone-5', 'iphone-4', 'iphone-3'];
  runViewports(name, viewports, callback);
}

/**
 * Run tests on Tablet viewports
 * @param {string} name The name of the test
 * @param callback The callback that is called with the tested viewport
 */
export function runOnTabletViewports(name, callback) {
  const viewports = ['ipad-2', 'ipad-mini'];
  runViewports(name, viewports, callback);
}

/**
 * Run tests on desktop viewports
 * @param {string} name The name of the test
 * @param callback The callback that is called with the tested viewport
 */
export function runOnDesktopViewports(name, callback) {
  const viewports = ['macbook-15', 'macbook-13', 'macbook-11'];
  runViewports(name, viewports, callback);
}

/**
 * Run test on viewports
 * @param {string} name The name of the test
 * @param {array<string>}viewports
 * @param callback The callback that is called with the tested viewport
 */
export function runViewports(name, viewports, callback) {
  const total = viewports.length;
  viewports.forEach((viewport, i) => {
    describe(name, (context, done) => {
      it(`on ${viewport} (${i + 1}/${total})`, () => {
        cy.viewport(viewport);
        callback(viewport, context, done);
      });
    });
  });
}
