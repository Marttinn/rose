import React from 'react';
import { compose, graphql, ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';
import { link } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { EditorState, convertToRaw, ContentState, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

class ServiceEdit extends React.Component { 

  constructor(props) {
    super(props);
    
    
    if( this.props.data && this.props.data.Services ){
      const html = this.props.data.Services.text;
      const blocks = htmlToDraft(html);
      const contentState = ContentState.createFromBlockArray(blocks);
      const editorState = EditorState.createWithContent(contentState);
      this.state = {
       title: this.props.data.Services.title,
       language: this.props.data.Services.language,
       editorState
      }
    } else {
      const editorState = EditorState.createEmpty();
      this.state = {
        id: props.match.params.id,
        title: '',
        language: 'CZ',
        editorState 
      }
    }
    
    this.languages = [
      'CZ',
      'DE',
      'EN',
      'SP',
      'SK'
    ]
    this.save = this.save.bind(this);
    this.load = this.load.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    console.log('ServiceEdit', this.props )
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

  

    onEditorStateChange (editorState)  {
      
      this.setState({
        editorState,

      });
    };

   
    load(services) {

       // transforming from HTML -> EditorState
      const html = services.text;
      const blocks = htmlToDraft(html);
      const contentState = ContentState.createFromBlockArray(blocks);
      const editorState = EditorState.createWithContent(contentState);
      console.log('ServiceEdit::load', services)
      this.setState({
        title: services.title,
        language: services.language,
        editorState: editorState
      })
    }

    
    save() {
      const title = this.state.title;
      const language = this.state.language;

      // transforming EditorState -> HTML
      const contentState = this.state.editorState.getCurrentContent();
      const blocks = convertToRaw(contentState);
      const html = draftToHtml(blocks);
  
      const variables = {
        id: this.state.id,
        title : title,
        text : html,
        lang : language
      }
      console.log('ServiceEdit::edit', variables)
        this.props.updateService({
       variables: variables
      }).then((success)=> {
        this.setState({
          edited : true
        })
    })
    }


    componentWillReceiveProps(nextProps) {
      console.log('ServiceEdit::componentWillReceiveProps', nextProps )
      if(nextProps.data && nextProps.data.Services ){
        this.load(nextProps.data.Services);
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
          <button onClick={this.save}>Edit</button>
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

export default compose(
  graphql(getServiceQL, {
    skip: (props) => {
      console.log('ServiceEdit::compose::skip', props)
      return !(props.match && props.match.params && props.match.params.id);
    },
    options: (props) => {
      console.log('ServiceEdit::compose::options', props)
      if(props.match && props.match.params && props.match.params.id){
        return {
          variables:{
            id: props.match.params.id
          }
        }
      }
      return {}
    },
  }),
  graphql(updateServiceQL, {
    name: 'updateService'
  }),
)(ServiceEdit);
