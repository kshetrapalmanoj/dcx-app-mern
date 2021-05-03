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
    }

    this.emailHandler = this.emailHandler.bind(this)
    this.passwordHandler = this.passwordHandler.bind(this)
    this.login = this.login.bind(this)
  }



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
          this.setState({
            message: err.response.data.message
          })
          localStorage.removeItem('login')
        }
      );
    console.log('Developer Details:', this.state);

  }
  render() {

    let error = ''
    if (this.state.message) {
      error = (
        <div className="alert alert-danger text-center" role="alert">
          {this.state.message}
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
                <form>
                  <h3 className="text-center mb-md-4">Login to Continue</h3>
                  {error}
                  <div className="form-group">
                    <label htmlFor="empEmail" className="font-weight-bold">Email Address</label>
                    <input type="text" placeholder="eg. john.doe@gmail.com" id="empEmail" name="empEmail"
                      className="form-control" value={this.state.email} onChange={this.emailHandler} />

                    <div className="text-danger">{this.state.emailError}</div>
                    <br></br>
                    <label htmlFor="empPassword" className="font-weight-bold">Password</label>
                    <input type="password" placeholder="Choose a secure password" id="empPassword" name="empPassword"
                      className="form-control" value={this.state.password} onChange={this.passwordHandler} />
                  </div>
                  <div className="text-danger">{this.state.passwordError}
                  </div>
                  <div className="text-center">
                    <button className="btn btn-success mr-3 btn-sm" onClick={this.login} disabled={!this.state.password}>Login</button>
                    <Link to="/signup"><button className="btn btn-outline-secondary btn-sm">Sign Up</button></Link>
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
