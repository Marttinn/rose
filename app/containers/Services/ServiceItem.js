import React from 'react';
import { graphql, ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ServiceNew } from '../ServiceNew';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class ServiceItem extends React.Component{
    constructor(...args){
      super(...args);
      this.delete = this.delete.bind(this)
      this.state = {
        open:false,
        mystyle : {
          color: 'blue'
        },
        deleted: false
      }
      console.log('ServiceItem', this.props)
    }

    handleClickOpen = () => {
      this.setState({ open: true });
    };
    handleClose = () => {
        this.setState({ open: false });
      };

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
      // TODO: dialogs
      return(
        this.state.deleted ? null : 
        <div style={this.state.mystyle}>
          {this.props.service.id}
        <span style={{paddingLeft:'10px'}}>{this.props.service.title}</span> 
        <span style={{paddingLeft:'10px'}}>  {this.props.service.language}</span> 
        <Button variant="raised" size="small" color="secondary"onClick={this.handleClickOpen}> Delete </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Let Google help apps determine location. This means sending anonymous location data to
              Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
        <hr/>
        </div>
    )
  }
  }
  
  const ServiceItemQL =graphql(gql`
  mutation  deleteService($identificator:ID!){
    deleteServices(id:$identificator){
      id
    }
  }
  `)(ServiceItem)
  