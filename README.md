# Faciem

> The Frontend of the venovum application

## Build Setup

``` bash
# install dependencies
$ npm run install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).

Note: the officum server must be installed using [valet](https://laravel.com/docs/6.x/valet) on `venovum.dev`.

## Deployment

The deployment is setup using [Serverless.com](https://serverless.com). 
It is required to set up a AWS account and then add a Serverless user via the [Console](http://console.aws.amazon.com). A tutorial can be found on [serverless.com](https://serverless.com/framework/docs/providers/aws/guide/credentials/).

Don't forget to add a `secrets.json` file containing:
```json
{
  "NODE_ENV": "prod",
  "DOMAIN": "test.example.com",
  "CERT": "*.example.com",
  "CFN_ROLE": "arn:aws:iam::<ID>:role/<project>"
}
```

After that, you should be able to run a deployment
```bash
npm run deploy
```
