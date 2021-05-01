// import './css/style.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import { Redirect } from 'react-router';
import About from './About'
import Dashboard from './Dashboard';
import Register from './Register';
import Browse from './Browse';
import Contact from './Contact';
import Login from './Login'
import SignUp from './SignUp';

function Home() {

  const LoginGuardRoute = ({ component: Component, ...props }) => (
    <Route
      {...props}
      render={routeProps => {
        return localStorage.getItem("login") ?
          (
            <Component {...routeProps} />
          ) : (
            <Redirect to="/login" />
          );
      }}
    />
  );

  return (
    <Router>
      <div>
        <div id="container">
          <header>
            <h1><span className="blueText">DCX</span> Developer Directory</h1>
            <h2>Find A Developer <span class="whiteText">NOW</span></h2>
          </header>

          <nav id="menu">
            <ul>
              <li className="menuitem"><Link to="/dashboard">Home</Link></li>
              <li className="menuitem"><Link to="/about">About Us</Link></li>
              <li className="menuitem"><Link to="/browse">Browse Developers</Link></li>
              <li className="menuitem"><Link to="/register">Register a New Developer</Link></li>
              <li className="menuitem"><Link to="/contact">Contact Us</Link></li>
              <li className="menuitem"><Link to="/login" onClick={() => localStorage.clear()} >Logout</Link></li>
            </ul>
          </nav>
        </div>

        <Switch>

          <LoginGuardRoute path="/dashboard" component={Dashboard} />
          <LoginGuardRoute path="/register" component={Register} />
          <LoginGuardRoute path="/browse" component={Browse} />
          <Route path="/login" component={Login}></Route>
          <Route path="/signup" component={SignUp}></Route>
          <LoginGuardRoute path="/about" component={About} />
          <LoginGuardRoute path="/contact" component={Contact} />
          <LoginGuardRoute exact path="/" component={Dashboard} />

        </Switch>
      </div>
    </Router >

  );
}


export default Home;
