import React from 'react';
import { graphql, ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { ServiceNew } from '../ServiceNew';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});
export class ServiceItem extends React.Component{
    constructor(...args){
      super(...args);
      this.delete = this.delete.bind(this)
      this.state = {
        mystyle : {
          color: 'blue'
  
        },
        deleted: false
      }
      const { classes } = props;
      
    }
    
    delete() {
      const id = this.props.service.id;
      console.log(id)
     
      this.setState({
        mystyle : {
          color: 'gray'
        }
      })
  
     this.props.mutate({
       variables:{
         identificator:this.props.service.id
        }
      }).then((success)=> {
        this.setState({
          deleted : true
        })
    })
    }
  
    render(){
      return(
        this.state.deleted ? null : 
        <div style={this.state.mystyle}>
          {this.props.service.id}
        <span style={{paddingLeft:'10px'}}>{this.props.service.title}</span> 
        <span style={{paddingLeft:'10px'}}>  {this.props.service.language}</span> 
          <Button color="primary" onClick={this.delete} className={classes.button}>
           Delete
          </Button> 
        </div>
    )
  }
  }
  ServiceItem.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  export default withStyles(styles)(ServiceItem);

  const ServiceItemQL = graphql(gql`
  mutation  deleteService($identificator:ID!){
    deleteServices(id:$identificator){
      id
    }
  }
  `)(ServiceItem)
  