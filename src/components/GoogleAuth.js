import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
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
        
        this.onAuthChange(this.auth.isSignedIn.get());
        this.auth.isSignedIn.listen(this.onAuthChange);
      });
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
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

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
