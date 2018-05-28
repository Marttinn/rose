import React from 'react';
import { graphql, ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';
import { link } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

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
    this.edit = this.edit.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    this.state = {
      editorState: EditorState.createEmpty()
    };
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
  edit() {
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
          edited : true
        })
    })
    }
    onEditorStateChange (editorState)  {
      
      this.setState({
        editorState,

      });
    };

    
  render() {
    const { editorState } = this.state;
    console.log('ServiceEdit:render()', this.props )
    return (
      
      <div>
       
        <Link to="/services">
          Services
        </Link>

        <form onSubmit={this.handleSubmit}>
          Name:
          <input type="text" value={this.state.title} onChange={this.handleTitleChange}/>   
          <p>
          
          <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={this.onEditorStateChange}
          />
          </p>
          <select value={this.state.value} onChange={this.handleSelectChange}>
            {this.languages.map((lang,index)=> {return <option key ={index} value={lang}>{lang}</option>})}
          </select>
          <button onClick={this.edit}>Edit</button>
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

