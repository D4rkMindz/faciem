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

The deployment is setup using [Digital Ocean](https://digital-ocean.com). 
There is a kubernetes cluster running on digital ocean.
If you want to setup another cluster, dont forget to set the secret.

```bash
DOCKER_USERNAME=myname
DOCKER_PASSWORD=password
# Receive the configuration
doctl kubernetes cluster kubeconfig show venovum-faciem-de-1 > .kubeconfig
# Set the secret
kubectl create secret docker-registry dockerhub-secret --kubeconfig=.kubeconfig --docker-server=https://index.docker.io/v2/ --docker-username=$DOCKER_USERNAME --docker-password=$DOCKER_PASSWORD
```
