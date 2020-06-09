/* eslint-disable */
export default ({ app }) => {
  const stop = app.i18n.t('CONSOLE.stop');
  const info = app.i18n.t('CONSOLE.info');
  console.clear();
  console.log(`%c${stop}`, 'color:red; font-size: 3rem; font-family: monospace');
  console.log(`%c${info}`, 'font-size: 1.5rem; font-family: monospace');
};
