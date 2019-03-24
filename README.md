# HTTP Requests Tests examples using Jest

This repository contain examples of how tests of javascript functions that call http requests can be made using Jest (or another library). I've made two approaches, one using [Nock](https://github.com/nock/nock) for stub http requests, and another using [Polly.js](https://netflix.github.io/pollyjs) to record http request.

## Instructions

* Install packages running `npm install`
* Run tests running `npm test`

## Explanation

### TodoService.js

It's a basic service that uses [axios](https://github.com/axios/axios) to make http calls to an API to manage todos. There's a fake API server that can be initialized by the `npm run server` command that starts an API in port `3000`, and is used by `/__test__/TodoService_recording.spec.js` to record interaction with server.

### Nock.js

The `/__test__/TodoService_stubing.spec.js` file contains the test using [Nock](https://github.com/nock/nock) that stub http requests to tests the services. I think this approach is more flexible because allow to write tests for services that is not implemented yet, and offers freedom to set http requests and response that match every situation the programmer wants.

### Polly.js

The `/__test__/TodoService_recording.spec.js` file contains the test using [Polly.js](https://netflix.github.io/pollyjs) that records http requests from the actual API when the tests are running. I think this approach is easier to be implemented because you don't have to write requests and responses for every tests. And another advantage is that you can test the service against requests and responses that match the actual API.

## References

* [Nock](https://github.com/nock/nock#usage)
* [Polly.js](https://netflix.github.io/pollyjs/#/README)