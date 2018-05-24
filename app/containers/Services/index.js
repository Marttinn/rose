import React from 'react';
import { graphql, ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import ServiceItem from '../Services/ServiceItem.js';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});
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
      <div>   
        {this.props.data.loading ? <span>Loading...</span> : null}
        {this.props.data.allServiceses ? this.props.data.allServiceses.map((s, index) => <span key ={index}>
          <ServiceItemQL service={s} />
        </span>) : null}
        </div>
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

const ServiceItemQL = graphql(gql`
mutation  deleteService($identificator:ID!){
  deleteServices(id:$identificator){
    id
  }
}
`)(ServiceItem)
