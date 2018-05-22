

import React from 'react';
import { Link } from 'react-router-dom';


export default class Services extends React.Component { 
  render() {
    return (
      <h1>
        This is ServicesPage component!
        <p>
        <Link to="/services/new">
          Create new
        </Link>
        </p>

      </h1>
    );
  }
}
