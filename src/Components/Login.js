import React, { Component } from 'react';
import axios from "axios";
import { environment } from '../services/DeveloperService';
import { Link } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      passwordError: "",
      emailError: "",
    }

    this.emailHandler = this.emailHandler.bind(this)
    this.passwordHandler = this.passwordHandler.bind(this)
    this.login = this.login.bind(this)
  }

  validate = () => {
    let passwordError = "";
    let emailError = "";


    if (!this.state.password) {
      passwordError = "Password cannot be empty";
    } else if (!this.state.password.match("(?=.*[@#$]).{8,}")) {
      passwordError = "Password is invalid";
    }
    if (!this.state.email) {
      emailError = "Email cannot be empty";
    } else if (
      !this.state.email.match("\\S+?@\\S+?\\.com")
    ) {
      emailError = "Email is invalid";
    }

    if (

      passwordError ||
      emailError

    ) {
      this.setState({
        passwordError,
        emailError,
      });
      return false;
    }
    return true;
  };

  emailHandler = (event) => {
    this.setState({ email: event.target.value })
  }

  passwordHandler = (event) => {
    this.setState({ password: event.target.value })
  }

  login = (event) => {
    event.preventDefault();
    const data = {
      email: this.state.email,
      password: this.state.password,
    };

    const isValid = this.validate();
    if (isValid) {
      axios
        .post(`${environment.baseUrl}/login`, data)
        .then(
          res => {
            console.log(res)
            localStorage.setItem('login', JSON.stringify({
              login: true,
              token: res.data
            }))
            this.props.history.push('/')
          }
        )
        .catch(
          err => {
            alert('Invalid Credentials', err)
            localStorage.removeItem('login')
          }
        );
      console.log('Developer Details:', this.state);
    }
  }
  render() {
    return (
      <div>
        <div className="container">
          <h2 className="text-center mb-md-4">Login to Continue</h2>
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="empEmail" className="font-weight-bold">Email Address</label>
                    <input type="text" placeholder="eg. john.doe@gmail.com" id="empEmail" name="empEmail"
                      className="form-control" value={this.state.email} onChange={this.emailHandler} />
                  </div>
                  <div className="text-danger">{this.state.emailError}</div>
                  <br></br>

                  <div className="form-group">
                    <label htmlFor="empPassword" className="font-weight-bold">Password</label>
                    <input type="password" placeholder="Choose a secure password" id="empPassword" name="empPassword"
                      className="form-control" value={this.state.password} onChange={this.passwordHandler} />
                  </div>
                  <div className="text-danger">{this.state.passwordError}</div>
                  <br></br>

                  <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                    <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                  </div>
                  <br></br>
                  <div className="text-center">
                    <button className="btn btn-success" onClick={this.login} disabled={!this.state.password}>Login</button>

                  </div>
                  <br></br>
                  <div className="text-center">
                    <Link to="/signup"><button className="btn btn-outline-secondary">Sign Up</button></Link>
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

export default Login;
