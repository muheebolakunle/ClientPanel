import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import Spinner from "../layout/Spinner";

class EditClient extends Component {
  constructor(props) {
    super(props);
    this.firstNameUpdate = React.createRef();
    this.lastNameUpdate = React.createRef();
    this.emailUpdate = React.createRef();
    this.phoneUpdate = React.createRef();
    this.balanceUpdate = React.createRef();
  }

  onSubmit = async e => {
    e.preventDefault();

    const { client, firestore, history } = this.props;

    // Updated client
    const updClient = {
      firstName: this.firstNameUpdate.current.value,
      lastName: this.lastNameUpdate.current.value,
      email: this.emailUpdate.current.value,
      phone: this.phoneUpdate.current.value,
      balance:
        this.balanceUpdate.current.value === ""
          ? 0
          : this.balanceUpdate.current.value
    };

    // Update client in firestore
    await firestore.update(
      { collection: "clients", doc: client.id },
      updClient
    );

    history.push("/");
  };

  render() {
    const { client } = this.props;
    const { disableBalanceOnEdit } = this.props.settings;

    if (client) {
      const { firstName, lastName, email, phone, balance } = client;
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/" className="btn btn-link">
                <i className="fa fa-arrow-circle-left" /> Back To Dashboard
              </Link>
            </div>
          </div>

          <div className="card">
            <div className="card-header">Edit Client</div>
            <div className="card-body">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    minLength="2"
                    required
                    defaultValue={firstName}
                    ref={this.firstNameUpdate}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    minLength="2"
                    required
                    defaultValue={lastName}
                    ref={this.lastNameUpdate}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    defaultValue={email}
                    ref={this.emailUpdate}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    minLength="10"
                    required
                    defaultValue={phone}
                    ref={this.phoneUpdate}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="balance">Balance</label>
                  <input
                    type="text"
                    className="form-control"
                    name="balance"
                    defaultValue={balance}
                    ref={this.balanceUpdate}
                    disabled={disableBalanceOnEdit}
                  />
                </div>

                <input
                  type="submit"
                  value="Update"
                  className="btn btn-primary btn-block"
                />
              </form>
            </div>
          </div>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

EditClient.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(props => [
    { collection: "clients", storeAs: "client", doc: props.match.params.id }
  ]),
  connect(({ firestore: { ordered }, settings }, props) => ({
    client: ordered.client && ordered.client[0],
    settings
  }))
)(EditClient);
