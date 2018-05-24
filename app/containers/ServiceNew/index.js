import React from 'react';
import { graphql, ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';
import { link } from 'react-router-dom';

export class ServiceNew extends React.Component { 

  constructor(props) {
    super(props);
    this.state = {title: '', text: '', option: ''};
    this.create = this.create.bind(this);

    this.languages = [
      'CZ',
      'DE',
      'EN',
      'SP',
      'SK'
    ]

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTitleChange(event) {
    this.setState({title: event.target.value});
  }
  handleTextChange(event) {
    this.setState({text: event.target.value});
  }
  handleSelectChange(event) {
    this.setState({option: event.target.value});
  }

  handleSubmit(event) {
    //alert('A name was submitted: ' + this.state.title + ' ' + this.state.text + ' ' + this.state.option );
    
    event.preventDefault();
  }
  create() {
      const title = this.state.title;
      const text = this.state.text;
      const option = this.state.option;
  
     this.props.mutate({
       variables:{
         identificator:this.state.id
        }
      }).then((success)=> {
        this.setState({
          created : true
        })
    })
    }
  render() {
    return (
      
      <div>
       
        
        <form onSubmit={this.handleSubmit}>
          Name:
          <input type="text" value={this.state.title} onChange={this.handleTitleChange} />   
          <p>
            <textarea value={this.state.text} onChange={this.handleTextChange} rows="5" ></textarea>
          </p>
          <select value={this.state.value} onChange={this.handleSelectChange}>
            {this.languages.map((lang)=> {return <option value={lang}>{lang}</option>})}
          </select>
          <input type="submit" value="Create"/>
        </form>
        

      </div>
    );
  }
}
export default graphql(gql`
  {newService{
    text,
    title,
    language  
  }}
`)(ServiceNew);
const CreateServiceItemQL = graphql(gql`
mutation createService($text:String, $title:String, $lang:String){
  createServices(text:$text, title:$title, language:$lang){
    text,title,language
  }
}
`)(ServiceNew)

