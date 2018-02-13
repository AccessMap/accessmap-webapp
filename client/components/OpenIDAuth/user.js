import React from "react";
import { connect } from "react-redux";
import userManager from "../../utils/userManager";
import Button from 'react-md/lib/Buttons';

class User extends React.Component {
  render() {
    const { user } = this.props;

    return (
      <Button
        key='nav-user'
        flat
        label={user.profile.name ? user.profile.name : "Mister Unknown"}
        onClick={() => {
          event.preventDefault();
          alert(JSON.stringify(this.props.user, null, 2));
          userManager.removeUser(); // removes the user data from sessionStorage
        }}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.oidc.user,
  };
}

export default connect(mapStateToProps)(User);
