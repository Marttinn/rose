import React from 'react';

import { graphql, ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';

export class Services extends React.Component {
  constructor(...args){
    super(...args);
  }

  render() {
    return (
      <div>    
        {this.props.data.loading ? <Text>Loading...</Text> : null}
        {this.props.data.allServiceses ? this.props.data.allServiceses.map((s) => <Text>{s.text}</Text>) : null}
      </div>
    );
  }
}

export default graphql(gql`
  {allServiceses{
    id,
    text,
    title,
    language
  }}
`)(Services);