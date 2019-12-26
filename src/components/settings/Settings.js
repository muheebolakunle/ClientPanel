import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  setAllowRegistration,
  setDisableBalanceOnAdd,
  setDisableBalanceOnEdit
} from "../../actions/settingsActions";

class Settings extends Component {
  allowRegistrationOnClick = () => {
    const { setAllowRegistration } = this.props;
    setAllowRegistration();
  };

  disableBalanceOnAddClick = () => {
    const { setDisableBalanceOnAdd } = this.props;
    setDisableBalanceOnAdd();
  };

  disableBalanceOnEditClick = () => {
    const { setDisableBalanceOnEdit } = this.props;
    setDisableBalanceOnEdit();
  };

  render() {
    const {
      allowRegistration,
      disableBalanceOnAdd,
      disableBalanceOnEdit
    } = this.props.settings;

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
          <div className="card-header">
            <h3> Edit Settings</h3>
          </div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <label>Allow Registration</label>{" "}
                <input
                  type="checkbox"
                  className="primary"
                  name="allowRegistration"
                  checked={!!allowRegistration}
                  onChange={this.allowRegistrationOnClick}
                  value={allowRegistration}
                />
              </div>

              <div className="form-group">
                <label>Disable Balance on Add</label>{" "}
                <input
                  type="checkbox"
                  name="disableBalanceOnAdd"
                  checked={!!disableBalanceOnAdd}
                  onChange={this.disableBalanceOnAddClick}
                  value={disableBalanceOnAdd}
                />
              </div>

              <div className="form-group">
                <label>Disable Balance on Edit</label>{" "}
                <input
                  type="checkbox"
                  name="disableBalanceOnEdit"
                  checked={!!disableBalanceOnEdit}
                  onChange={this.disableBalanceOnEditClick}
                  value={disableBalanceOnEdit}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  settings: PropTypes.object.isRequired
};

export default connect(
  (state, props) => ({
    settings: state.settings
  }),
  { setAllowRegistration, setDisableBalanceOnAdd, setDisableBalanceOnEdit }
)(Settings);
