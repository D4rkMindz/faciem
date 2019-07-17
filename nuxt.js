const { Nuxt } = require('nuxt-start');
process.env.NODE_ENV = 'production';
const config = require('./nuxt.config.js');

const nuxt = new Nuxt({ ...config, dev: false });

module.exports = (req, res) => nuxt.ready().then(() => nuxt.server.app(req, res));
