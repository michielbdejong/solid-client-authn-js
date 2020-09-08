# Solid JavaScript Authentication for the browser - solid-client-authn-browser

`solid-client-authn-browser` can be used to help build web apps in the browser.
The main documentation is at the [root of the repository](../../README.md). 

## Underlying libraries

`solid-client-authn-browser` is based on [`oidc-client-js`](https://github.com/IdentityModel/oidc-client-js). 
However, the latter lacks some features that are necessary to provide the developer
experience we specifically want for the Solid ecosystem, so we developped  
[`oidc-dpop-client-browser`](../oidc-dpop-client-browser/README.md) to add these features.