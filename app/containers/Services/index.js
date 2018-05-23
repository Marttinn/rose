import React from 'react';
import { graphql, ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';




export class ServiceItem extends React.Component{
  constructor(...args){
    super(...args);
    this.delete = this.delete.bind(this)
    console.log('ServiceItem', this.props)

    this.state = {
      mystyle : {
        color: 'blue'

      },
      deleted: false
    }
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
  

    

    
    //alert(id);
  }

  render(){
    return(
      this.state.deleted ? null : 
      <div style={this.state.mystyle}>
        {this.props.service.id}
      <span style={{paddingLeft:'10px'}}>{this.props.service.title}</span> 
      <span style={{paddingLeft:'10px'}}>  {this.props.service.language}</span>  
        <button onClick={this.delete}>Delete</button>
      </div>
  )
  
  
}
}



const ServiceItemQL = graphql(gql`
mutation  deleteService($identificator:ID!){
  deleteServices(id:$identificator){
    id
  }
}
`)(ServiceItem)



export class Services extends React.Component {
  constructor(...args){
    super(...args);
    
  }
    
  render() {
    console.log('ahoj kamo', this.props.data.allServiceses)
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
        {this.props.data.allServiceses ? this.props.data.allServiceses.map((s) => <span>
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