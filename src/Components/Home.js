// import './css/style.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import About from './About'
import Dashboard from './Dashboard';
import Register from './Register';
import Browse from './Browse';
import Contact from './Contact';
function Home() {

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
            </ul>
          </nav>


        </div>
        <Switch>
          <Route exact path="/" component={Dashboard}></Route>
          <Route path="/dashboard" component={Dashboard}></Route>
          <Route path="/about" component={About}></Route>
          <Route path="/register" component={Register}></Route>
          <Route path="/browse" component={Browse}></Route>
          <Route path="/contact" component={Contact}></Route>
        </Switch>
      </div>
    </Router>

  );
}


export default Home;
