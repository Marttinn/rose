import React from 'react';
import { graphql, ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';
import { link } from 'react-router-dom';

class ServiceEdit extends React.Component { 

  constructor(props) {
    super(props);
    this.state = {title: '', text: '', language: 'CZ'};
    this.languages = [
      'CZ',
      'DE',
      'EN',
      'SP',
      'SK'
    ]
    this.create = this.create.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    console.log('ServiceEdit', this.props )
    // this.props.id
  }

  handleTitleChange(event) {
    this.setState({title: event.target.value});
  }
  handleTextChange(event) {
    this.setState({text: event.target.value});
  }
  handleSelectChange(event) {
    this.setState({language: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
  }
  create() {
      const title = this.state.title;
      const text = this.state.text;
      const language = this.state.language;
  
     this.props.mutate({
       variables:{
        title : this.state.title,
        text : this.state.text,
        lang : this.state.language
        }
      }).then((success)=> {
        this.setState({
          created : true
        })
    })
    }

    
  render() {
    console.log('ServiceEdit:render()', this.props )
    return (
      
      <div>
       
        
        <form onSubmit={this.handleSubmit}>
          Name:
          <input type="text" value={this.state.title} onChange={this.handleTitleChange} />   
          <p>
            <textarea value={this.state.text} onChange={this.handleTextChange} rows="5" ></textarea>
          </p>
          <select value={this.state.value} onChange={this.handleSelectChange}>
            {this.languages.map((lang,index)=> {return <option key ={index} value={lang}>{lang}</option>})}
          </select>
          <button onClick={this.create}>Create</button>
        </form>
        

      </div>
    );
  }
}


  
const ServiceEditQL = graphql(gql`
  query getService($id:ID!){
    Services(id:$id){
      text,
      title,
      language
    }
  }
`)(ServiceEdit);
 
  
export default class ServiceEditMatchId extends React.Component { 
  render() {
    return (<ServiceEditQL id={this.props.match.params.id} />)
  }
}

