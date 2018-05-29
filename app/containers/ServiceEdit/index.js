import React from 'react';
import { compose, graphql, ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';
import { link } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class ServiceEdit extends React.Component { 

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      text: '',
      language: 'CZ',
      editorState: EditorState.createEmpty()
    };
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
  
     this.props.updateService({
       variables:{
         id: this.props.id,
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
    componentWillReceiveProps(nextProps) {
      if(nextProps.data.Services && nextProps.data){
        this.setState({
          title: nextProps.data.Services.title,
          text: nextProps.data.Services.text,
          language: nextProps.data.Services.language
        })
      }
    }

    
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
          
          
          <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={this.onEditorStateChange}
          />
          
          <select value={this.state.language} onChange={this.handleSelectChange}>
            {this.languages.map((lang,index)=> {return <option key ={index} value={lang} >{lang}</option>})}
          </select>
          <button onClick={this.edit}>Edit</button>
        </form>
      </div>
    );
  }
}
const getServiceQL = gql`query getService($id:ID!){
  Services(id:$id){
    text,
    title,
    language
  }
}
`;

  const updateServiceQL = gql` mutation updateService($id :ID!, $text:String, $title:String, $lang:String){
    updateServices(id:$id, text:$text, title:$title, language:$lang){
      text,title,language
    }
  }`;

const ServiceEditQL = compose(
  graphql(getServiceQL),
  graphql(updateServiceQL, {
    name: 'updateService'
  }),
)(ServiceEdit);

export default class ServiceEditMatchId extends React.Component { 
  render() {
    return (<ServiceEditQL id={this.props.match.params.id} />)
  }
}
