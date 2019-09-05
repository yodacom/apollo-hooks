import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http'
import { ApolloProvider } from '@apollo/react-hooks'

// create http link to our graphql api 
const httpLink = createHttpLink({
  uri: '<HTTPS://YOUR GRAPHQL API LINK>'
})
// if you need to send headers to your graphql endpoint set them in authLink and set your header properties
const authLink = setContext({ _, { headers }} => {
  return {
    headers: {
      'x-api-key': " <YOUR API KEY> "
    }
  }
})
//Create client variable by calling new Apollo Client and passing in the the link and the cache property as new end memory cache.  If you do not have an auth link you can just pass in the httpLink as the link property
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

// create an Apollo app component passing in the client as client into the Apollo Provider
const ApolloApp = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)

// in ReactDom render replace the  <App /> component with our new ApolloApp component
ReactDOM.render(<ApolloApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
