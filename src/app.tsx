import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {installRelayDevTools} from 'relay-devtools';

import {
  QueryRenderer,
  graphql,
} from 'react-relay';

// Useful for debugging, but remember to remove for a production deploy.
installRelayDevTools();

import HomePage from './epics/HomePage';
import {
  Environment,
  Network,
  RecordSource,
  Store,
} from 'relay-runtime';
// import env as modernEnvironment from './relay/createEnvironment';
import { appQuery } from './__relay_artifacts__/appQuery.graphql';


function fetchQuery(
  operation: any,
  variables: any,
) {
  return fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then(response => {
    return response.json();
  });
}

const modernEnvironment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

ReactDOM.render(
  <QueryRenderer<appQuery>
    environment={modernEnvironment}
    query={graphql`
      query appQuery {
        viewer {
          ...HomePage_viewer
        }
      }
    `}
    variables={{}}
    render={({error, props}) => {
      if (props && props.viewer) {
        return <HomePage viewer={props.viewer} />;
      } else if (props || error) {
        console.error(`Unexpected data: ${props || error}`)
      } else {
        return <div>Loading</div>;
      }
    }}
  />,
  document.getElementById('root')
);
