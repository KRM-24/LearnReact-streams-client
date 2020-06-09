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

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.state.isSignedIn === null) {
      return null;
    } else if (this.state.isSignedIn) {
      return (
        <button 
          onClick={this.onSignOutClick} 
          className="ui red google button"
        >
          <i className="google icon" />
          Sign Out
        </button>
      )
    } else {
      return (
        <button 
          onClick={this.onSignInClick}
          className="ui red google button"
        >
          <i className="google icon" />
          Sign In with Google
        </button>
      )
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
