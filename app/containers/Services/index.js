/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';

export default class Services extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value + ' ' + document.getElementById("id1").value);
    event.preventDefault();
  }
  
  render() {
    return (
      
      <div>
        
        <form onSubmit={this.handleSubmit}>
          Name:
          <input type="text" value= {this.state.value} onChange={this.handleChange} />   
          <p>
            <textarea name="message" id="id1" rows="5" ></textarea>
          </p>
          <input type="submit" value="Create" />
        </form>
        

      </div>
    );
  }
}
