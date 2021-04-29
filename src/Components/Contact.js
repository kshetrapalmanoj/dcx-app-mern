// import './css/style.css';
import { Link } from 'react-router-dom'
import React from 'react'


const INITIAL_STATE = {
  name: "",
  phone: "",
  email: "",
  nameError: "",
  phoneError: "",
  emailError: ""
}
class Contact extends React.Component {
  constructor(props) {
    super(props);

    this.state = INITIAL_STATE

    this.changeNameHandler = this.changeNameHandler.bind(this)
    this.stopSubmission = this.stopSubmission.bind(this)
    // this.changePhoneHandler=this.changePhoneHandler.bind(this)
    // this.changeEmailHandler=this.changeEmailHandler.bind(this)
  }

  changeNameHandler = (e) => {
    this.setState({
      name: e.target.value
    })
  }
  changePhoneHandler = (e) => {
    this.setState({
      phone: e.target.value
    })
  }
  changeEmailHandler = (e) => {
    this.setState({
      email: e.target.value
    })
  }

  validate = () => {
    let nameError = ""
    let phoneError = ""
    let emailError = ""
    if (!this.state.name) {
      nameError = "Name cannot be empty"
    }
    else if (!this.state.name.match(/^[a-zA-Z\s]+$/)) {
      nameError = "Name must include only alphabets"
    }
    if (!this.state.email) {
      emailError = "Email cannot be empty"
    }
    else if (!this.state.email.match("\\S+?@\\S+?\\.com")) {
      emailError = "Invalid email"
    }
    if (!this.state.phone.match("^[6-9]\\d{9}$")) {
      phoneError = "Invalid phone number"
    }
    if (emailError || nameError || phoneError) {
      this.setState({ emailError, nameError, phoneError })
      return false
    }
    return true
  }

  stopSubmission = (e) => {
    e.preventDefault()
    const isValid = this.validate()
    if (isValid) {
      console.log(this.state)
      this.setState(INITIAL_STATE)
    }
  }

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
            <h3>Contact Us</h3>
            <div>Please use this form to contact a member of our website team</div>
            <form method="POST" onSubmit={this.stopSubmission}><br></br>
              <div>
                <label>Full Name</label>
                <input
                  value={this.state.name}
                  name="name"
                  className="form-control"
                  placeholder="Enter your name"
                  onChange={this.changeNameHandler}
                />
              </div>
              <div className="text-danger">
                {this.state.nameError}
              </div>
              <br></br>

              <div>
                <label>Email</label>
                <input
                  name="email"
                  value={this.state.email}
                  className="form-control"
                  placeholder="Enter your email address"
                  onChange={this.changeEmailHandler}
                />
              </div>
              <div className="text-danger">
                {this.state.emailError}

              </div>
              <br></br>
              <div>
                <label>Phone Number</label>
                <input
                  value={this.state.phone}
                  name="phone"
                  className="form-control"
                  placeholder="Enter your phone number"
                  onChange={this.changePhoneHandler}
                />
              </div>
              <div className="text-danger">
                {this.state.phoneError}
              </div>
              <br></br>
              <div> <button className="btn btn-outline-primary mt-2" disabled={!this.state.phone}>Submit</button></div>
              <br></br>
              <div>
                <Link to="/dashboard"><button className="btn btn-outline-warning">Go Back</button></Link>
              </div>
            </form>


          </section>
        </div>
        <div style={{ clear: "both" }}></div>
        <br></br>
        <footer>Copyright 2017. DCX Developer Directory.</footer>
      </div>


    );
  }

}

export default Contact;

