/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import {ApolloProvider} from 'react-apollo';
import Services from '../Services';
import ServiceNew from '../ServiceNew';
import ServiceEdit from '../ServiceEdit';
import { MuiThemeProvider } from '@material-ui/core';



const client = new ApolloClient({
  link: new HttpLink({uri:'https://api.graph.cool/simple/v1/cjheviv534c3b0158hvmz4sde'}),
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/services/new" component={ServiceEdit} />
        <Route exact path="/services/:id" component={ServiceEdit} />
        <Route exact path="/services" component={Services} />
        <Route component={NotFoundPage} />
        

      </Switch>
  </ApolloProvider>
    
  );
}
