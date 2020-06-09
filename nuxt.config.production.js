module.exports = {
  generate: {
    fallback: true,
  },
  axios: {
    baseURL: 'https://api.venovum.com',
  },
  build: {
    terser: {
      terserOptions: {
        compress: {
          drop_console: true,
        },
      },
    },
  },
};
