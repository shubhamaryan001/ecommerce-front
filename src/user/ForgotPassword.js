import React, { Component } from "react";
import { forgotPassword } from "../auth";

class ForgotPassword extends Component {
  state = {
    email: "",
    message: "",
    error: ""
  };

  forgotPassword = e => {
    e.preventDefault();
    this.setState({ message: "", error: "" });
    forgotPassword(this.state.email).then(data => {
      if (data.error) {
        console.log(data.error);
        this.setState({ error: data.error });
      } else {
        console.log(data.message);
        this.setState({ message: data.message });
      }
    });
  };

  render() {
    return (
      <div className="container-fluid standard-height">
        <div className="row">
          <div className="col-4"></div>
          <div className="col-4">
            <div className="card p-5 text-center">
              <h2 className=" mb-3">Ask for Password Reset</h2>

              {this.state.message && (
                <h4 className="bg-success">{this.state.message}</h4>
              )}
              {this.state.error && (
                <h4 className="bg-warning">{this.state.error}</h4>
              )}

              <form>
                <div className="form-group mt-5">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Your email address"
                    value={this.state.email}
                    name="email"
                    onChange={e =>
                      this.setState({
                        email: e.target.value,
                        message: "",
                        error: ""
                      })
                    }
                    autoFocus
                  />
                </div>
                <button
                  onClick={this.forgotPassword}
                  className="btn btn-raised btn-danger  "
                >
                  Send Password Rest Link
                </button>
              </form>
            </div>
          </div>

          <div className="col-4"></div>
        </div>
      </div>
    );
  }
}

export default ForgotPassword;
