import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import classnames from "classnames";
import Spinner from "../layout/Spinner";

class ClientDetails extends Component {
  state = {
    showBalanceUpdateForm: false,
    balanceUpdateAmount: ""
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = async e => {
    e.preventDefault();

    const { balanceUpdateAmount } = this.state;
    const { client, firestore } = this.props;

    const UpdBalance = {
      balance: balanceUpdateAmount === "" ? 0 : parseFloat(balanceUpdateAmount)
    };

    await firestore.update(
      { collection: "clients", doc: client.id },
      UpdBalance
    );
  };

  // Delete Click Handler

  onDeleteClick = async () => {
    const { client, firestore, history } = this.props;

    await firestore.delete({ collection: "clients", doc: client.id });

    history.push("/");
  };

  render() {
    const { client } = this.props;
    const { showBalanceUpdateForm, balanceUpdateAmount } = this.state;

    let balanceForm;
    if (showBalanceUpdateForm) {
      balanceForm = (
        <form onSubmit={this.onSubmit}>
          <div className="input-group">
            <div className="input-group-item">
              <input
                type="text"
                name="balanceUpdateAmount"
                className="form-control"
                placeholder="Add New Balance"
                onChange={this.onChange}
                value={balanceUpdateAmount}
              />
            </div>
            <div className="input-group-item-append">
              <input
                type="submit"
                value="Update"
                className="btn btn-outline-dark"
              />
            </div>
          </div>
        </form>
      );
    } else {
      balanceForm = null;
    }

    if (client) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/" className="btn btn-link">
                <i className="fa fa-arrow-circle-left" /> Back To Dashboard
              </Link>
            </div>
            <div className="col-md-6">
              <div className="btn-group float-right">
                <Link to={`/client/edit/${client.id}`} className="btn btn-dark">
                  Edit
                </Link>
                <button className="btn btn-danger" onClick={this.onDeleteClick}>
                  Delete
                </button>
              </div>
            </div>
          </div>
          <hr />

          <div className="card">
            <h3 className="card-header">
              {client.firstName} {client.lastName}
            </h3>
            <div className="card-body">
              <div className="row">
                <div className="col-md-8 col-sm-6">
                  <h4>
                    Client ID:{" "}
                    <span className="text-secondary">{client.id}</span>
                  </h4>
                </div>
                <div className="col-md-4 col-sm-6">
                  <h3 className="pull-left">
                    Balance:{" "}
                    <span
                      className={classnames({
                        "text-danger": client.balance > 0,
                        "text-success": client.balance === 0
                      })}
                    >
                      {" "}
                      &#x20A6;{parseFloat(client.balance).toFixed(2)}
                      {"  "}
                      <small>
                        <a
                          href="#!"
                          onClick={() =>
                            this.setState({
                              showBalanceUpdateForm: !showBalanceUpdateForm
                            })
                          }
                        >
                          <i className="fa fa-pencil" />{" "}
                        </a>
                      </small>
                    </span>
                  </h3>
                  {balanceForm}
                </div>
              </div>
              <hr />

              <ul className="list-group">
                <li className="list-group-item">
                  Contact Email: {client.email}
                </li>
                <li className="list-group-item">
                  Contact Phone: {client.phone}
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

ClientDetails.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(props => [
    { collection: "clients", storeAs: "client", doc: props.match.params.id }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    client: ordered.client && ordered.client[0]
  }))
)(ClientDetails);
