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
  groupError: ""
};

class Register extends Component {
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
        .then(res => console.log(res))
        .catch(err => console.log(err));
      console.log('Developer Details:', this.state);
      this.setState(INITIAL_STATE);
    }
  };

  render() {
    return (
      <div>
        <div id="container">

          <nav id="leftMenu">
            <h3>Links</h3>
            <ul>
              <li><Link to="/dashboard">SEO</Link></li>
              <li><Link to="/dashboard">PHP</Link></li>
              <li><Link to="/dashboard">Ajax</Link></li>
              <li><Link to="/dashboard">jQuery</Link></li>
              <li><Link to="/dashboard">Web design</Link></li>
              <li><Link to="/dashboard">Web Programming</Link></li>
              <li><Link to="/dashboard">Content Creation</Link></li>
              <li><Link to="/dashboard">Internet Marketing</Link></li>
              <li><Link to="/dashboard">XHTML Templates</Link></li>
            </ul>
          </nav>


          <section>
            <h3>Register A Developer</h3>
            <div>Please use this form to add a new developer</div>
            <br></br>

            <form method="POST" onSubmit={this.stopSubmission}>
              <div>
                <label>Full Name</label>
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
                <label>Email</label>
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
                <label>Password</label>
                <input
                  name="password"
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
                <label>Group</label>
              </div>

              <select class="custom-select" name="group" value={this.state.group}
                onChange={(e) =>
                  this.setState({ group: e.target.value })
                }>
                <option ></option>
                <option >Admin</option>
                <option >Developer</option>
              </select>

              <div className="text-danger">{this.state.groupError}</div>
              <br></br>
              <div>
                <button className="btn btn-outline-success mt-2" disabled={!this.state.group}>Submit</button>

              </div><br></br>

              <div>
                <Link to="/dashboard"><button className="btn btn-outline-warning">Go Back</button></Link>
              </div>
            </form>
          </section>
        </div>
        <div style={{ clear: "both" }}></div>
        <br></br><br></br>
        <footer>Copyright 2017. DCX Developer Directory.</footer>
      </div >
    );
  }
}

export default Register;