import React from 'react';

class GoogleAuth extends React.Component {
  componentDidMount() {
    // window.gapi able to be called because we includes Google's JS library in index.html
    // passing callback function into load() so gapi.client.init gets called after the load function finishes
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init( {
        // this clientId comes from console.developers.google.com - 'Streamy' project 
        clientId: '327906925820-5es1kd02njlnto4qlc0l9sm6pvdjupvr.apps.googleusercontent.com',
        scope: 'email'
      });
    });
  }
  
  render() {
    return (
      <div>
        Google Auth
      </div>
    );
  }
}

export default GoogleAuth;
