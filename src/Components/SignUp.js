// import './css/style.css';
import { Link } from 'react-router-dom'
import React, { Component } from "react";
import axios from "axios";
import { environment } from '../services/DeveloperService';

const INITIAL_STATE = {
  full_name: "",
  password: "",
  email: "",
  group: "",
  full_nameError: "",
  passwordError: "",
  emailError: "",
  groupError: "",
  message1: "",
  message2: ""
};

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = INITIAL_STATE;

    this.stopSubmission = this.stopSubmission.bind(this);
  }



  validate = () => {
    let full_nameError = "";
    let passwordError = "";
    let emailError = "";
    let groupError = ""

    if (!this.state.full_name) {
      full_nameError = "Name cannot be empty";
    } else if (!this.state.full_name.match(/[a-zA-Z]$/)) {
      full_nameError = "Name must include only alphabets";
    }
    if (!this.state.password) {
      passwordError = "Password cannot be empty";
    } else if (!this.state.password.match("(?=.*[@#$]).{8,}")) {
      passwordError = "Password must be at least 8 characters with at least one lowercase,uppercase and two special characters";
    }
    if (!this.state.email) {
      emailError = "Email cannot be empty";
    } else if (
      !this.state.email.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)
    ) {
      emailError = "Email is invalid";
    }
    if (!this.state.group) {
      groupError = "Group cannot be empty";
    }
    if (
      full_nameError ||
      passwordError ||
      emailError ||
      groupError
    ) {
      this.setState({
        full_nameError,
        passwordError,
        emailError,
        groupError
      });
      return false;
    }
    return true;
  };

  stopSubmission = (e) => {
    e.preventDefault();
    const data = {
      full_name: this.state.full_name,
      email: this.state.email,
      password: this.state.password,
      group: this.state.group
    };

    const isValid = this.validate();
    if (isValid) {
      axios
        .post(`${environment.baseUrl}/register`, data)
        .then(res => {
          this.setState({
            message1: 'Signed Up Successfully'
          })
        })
        .catch(err => {
          this.setState({
            message2: err.response.data.message
          })
        });
      console.log('Developer Details:', this.state);
      this.setState(INITIAL_STATE);
    }
  };

  render() {
    let error = ''
    let status = ''
    if (this.state.message2) {
      error = (
        <div className="alert alert-danger text-center" role="alert">
          {this.state.message2}
        </div>
      )
    }
    if (this.state.message1) {
      status = (
        <div class="alert alert-success text-center" role="alert">
          {this.state.message1}
        </div>
      )
    }

    return (
      <div>
        <div className="container">
          <h3 className="text-center mb-md-4"><pre> </pre></h3>
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3" style={{ borderRadius: "10px" }}>
              <div className="card-body">
                <form method="POST" onSubmit={this.stopSubmission}>
                  <h3 className="text-center mb-md-4">Sign Up</h3>
                  {error}
                  {status}
                  <div>
                    <label className="font-weight-bold">Full Name</label>
                    <input
                      name="full_name"
                      className="form-control"
                      placeholder="Enter your full name"
                      value={this.state.full_name}
                      onChange={(e) => this.setState({ full_name: e.target.value })}
                    />
                  </div>


                  <div className="text-danger">{this.state.full_nameError}</div>
                  <br></br>
                  <div>
                    <label className="font-weight-bold">Email</label>
                    <input
                      name="email"
                      className="form-control"
                      placeholder="Enter your email"
                      value={this.state.email}
                      onChange={(e) =>
                        this.setState({ email: e.target.value })
                      }
                    />
                  </div>
                  <div className="text-danger">{this.state.emailError}</div>
                  <br></br>
                  <div>
                    <label className="font-weight-bold">Password</label>
                    <input
                      name="password"
                      type="password"
                      className="form-control"
                      placeholder="Enter your password"
                      value={this.state.password}
                      onChange={(e) =>
                        this.setState({ password: e.target.value })
                      }
                    />
                  </div>
                  <div className="text-danger">{this.state.passwordError}</div>
                  <br></br>
                  <div>
                    <label className="font-weight-bold">Group</label>
                  </div>

                  <select class="custom-select" name="group" value={this.state.group}
                    onChange={(e) =>
                      this.setState({ group: e.target.value })
                    }>
                    <option></option>
                    <option >Developer</option>
                  </select>

                  <div className="text-danger">{this.state.groupError}</div>
                  <br></br>
                  <div className="text-center">
                    <button className="btn btn-outline-success mr-3 btn-sm" disabled={!this.state.group}>Submit</button>
                    <Link to="/login"><button className="btn btn-outline-secondary btn-sm">Sign In Now</button></Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default SignUp;
