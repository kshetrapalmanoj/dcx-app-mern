import React, { Component } from 'react';
import axios from "axios";
import { environment } from '../services/DeveloperService';

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: ''
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
                    console.log(err)
                    localStorage.removeItem('login')
                }
            );
        console.log('Developer Details:', this.state);
    }
    render() {
        return (
            <div>
                <div className="container">
                    <h3 className="text-center mb-md-4">Login to Continue</h3>
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="empEmail" className="font-weight-bold">Email Address</label>
                                        <input type="text" placeholder="eg. john.doe@gmail.com" id="empEmail" name="empEmail"
                                            className="form-control" value={this.state.email} onChange={this.emailHandler} />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="empPassword" className="font-weight-bold">Password</label>
                                        <input type="text" placeholder="Choose a secure password" id="empPassword" name="empPassword"
                                            className="form-control" value={this.state.password} onChange={this.passwordHandler} />
                                    </div>

                                    <div className="text-center">
                                        <button className="btn btn-success" onClick={this.login}>Login</button>
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