import React from 'react';
import { graphql, ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';

export class Services extends React.Component {
  constructor(...args){
    super(...args);
  }

  render() {
    return (
    <div>
      This is ServicesPage component!
      <p>
      <Link to="/services/new">
        Create new
      </Link>
      </p>
         
        {this.props.data.loading ? <span>Loading...</span> : null}
        {this.props.data.AllServiceses ? this.props.data.AllServiceses.map((s) => <span>{s.text}</span>) : null}

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