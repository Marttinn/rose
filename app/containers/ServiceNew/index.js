import React from 'react';

export default class ServiceNew extends React.Component { 

  constructor(props) {
    super(props);
    this.state = {title: '', text: '', option: ''};


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
    alert('A name was submitted: ' + this.state.title + ' ' + this.state.text + ' ' + this.state.option );
    event.preventDefault();
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
          <input type="submit" value="Create" />
        </form>
        

      </div>
    );
  }
}
