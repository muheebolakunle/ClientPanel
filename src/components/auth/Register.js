import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { withFirebase } from "react-redux-firebase";
import { UserIsNotAuthenticated } from "../../helpers/auth";
import Alert from "../layout/Alert";
import { notifyUser } from "../../actions/notifyActions";

class Register extends Component {
  state = {
    email: "",
    password: ""
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();

    const { firebase, notifyUser } = this.props;
    const { email, password } = this.state;

    firebase
      .createUser({
        email,
        password
      })
      .catch(err => notifyUser("This User Already exists", "error"));
  };

  render() {
    const { message, messageType } = this.props.notify;

    return (
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="card">
            <div className="card-body">
              {message ? (
                <Alert message={message} messageType={messageType} />
              ) : null}
              <h1 className="text-center pb-4 pt-3">
                <span className="text-primary">
                  <i className="fa fa-lock" /> Register
                </span>
              </h1>

              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    required
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    required
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Sign Up"
                  className="btn btn-primary btn-block"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  firebase: PropTypes.object.isRequired,
  notify: PropTypes.object.isRequired
};

export default compose(
  UserIsNotAuthenticated,
  withFirebase,
  connect(
    (state, props) => ({
      notify: state.notify
    }),
    { notifyUser }
  )
)(Register);
