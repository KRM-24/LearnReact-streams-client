import React from 'react';

class GoogleAuth extends React.Component {
  state = { isSignedIn: null };
  
  componentDidMount() {
    // window.gapi able to be called because we includes Google's JS library in index.html
    // passing callback function into load() so gapi.client.init gets called after the load function finishes
    window.gapi.load('client:auth2', () => {
      // init returns a Promise so use .then after it finishes
      window.gapi.client.init( {
        // this clientId comes from console.developers.google.com - 'Streamy' project 
        clientId: '327906925820-5es1kd02njlnto4qlc0l9sm6pvdjupvr.apps.googleusercontent.com',
        scope: 'email'
      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();
        this.setState({ isSignedIn: this.auth.isSignedIn.get() });
        this.auth.isSignedIn.listen(this.onAuthChange);
      });
    });
  }

  onAuthChange = () => {
    this.setState({ isSignedIn: this.auth.isSignedIn.get() });
  };

  renderAuthButton() {
    if (this.state.isSignedIn === null) {
      return <div>I don't know if we are signed in</div>;
    } else if (this.state.isSignedIn) {
      return <div>I am signed in!</div>;
    } else {
      return <div>I am not signed in</div>;
    }
  }
  
  render() {
    return (
      <div>
        {this.renderAuthButton()}
      </div>
    );
  }
}

export default GoogleAuth;
