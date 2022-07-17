import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache, ApolloProvider,  } from '@apollo/client';
import { BrowserRouter  } from 'react-router-dom';
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

const client = new ApolloClient({
  uri: 'https://pro-man-46.hasura.app/v1/graphql',
  headers:{
    'x-hasura-access-key':'KG6MmiP7nLkyz63cB5s0q4IJz9Ond4vCmlhfSJm8AbOyM9iEnU5AZsO34GjMDXel'
  },
  cache: new InMemoryCache(),
});
Sentry.init({
  dsn: "https://e87cbc33eeaf48af8487c565504e3165@o1322031.ingest.sentry.io/6579076",
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
  <BrowserRouter> 
    <App />
    </BrowserRouter>
  </ApolloProvider>
);

reportWebVitals();
