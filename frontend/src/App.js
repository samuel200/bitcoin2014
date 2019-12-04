import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './App.css';

import AboutPage from './components/Pages/AboutPage';
import InvestmentPage from './components/Pages/InvestmentPage';
import FaqPage from './components/Pages/FaqPage';
import ContactPage from './components/Pages/ContactPage';
import SigninPage from './components/Pages/SigninPage';
import SignupPage from './components/Pages/SignupPage';

import Particles from 'react-particles-js';
import HomePage from './components/Pages/HomePage';
import NavigationBar from './components/NavigationBar/NavigationBar';
import Loading from './components/Pages/Loading';
import ToTop from './components/Pages/ToTop';
import UserDashboardPage from './components/Pages/UserDashboardPage';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      authenticated: false,
      authenticationToken: ""
    }
  }

  componentDidMount(){
    if(localStorage.getItem('authenticatedUser') !== null){
      const data = JSON.parse(localStorage.getItem('authenticatedUser'))
      this.setState({ authenticated: true });
      this.setAuthenticatedUserData(data);
      this.setAuthenticationToken(data.token);
    }
  }

  setAuthenticatedUserData = obj =>{
    localStorage.setItem("authenticatedUser", JSON.stringify(obj));
  }

  setAuthenticated = val =>{
    this.setState({ authenticated: val })
  }
  
  setAuthenticationToken = val =>{
    this.setState({ authenticationToken: val })
  }

  stopLoading = ()=>{
    this.setState({loading: false})
  }

  render() {
    const { location } = this.props;

    return (
      <div>
          <Loading stopLoading={ this.stopLoading }/>
          <TransitionGroup className="page-holder">
          <Particles
              params={{
                "particles": {
                    "number": {
                        "value": 50
                    },
                    "size": {
                        "value": 3
                    },"color": {
                      "value": "#B150AF"
                  }
                },
                "interactivity": {
                    "events": {
                        "onhover": {
                            "enable": true,
                            "mode": "repulse"
                        }
                    }
                }
            }} style={{
              position: "fixed",
              width: "100vw",
              height: "100vh",
              zIndex: "0",
              }}/>
              <NavigationBar />
              <ToTop />
            <CSSTransition key={ location.key } classNames="page" timeout="1000">
              <Switch location={ location }>
                <Route path="/dashboard" render={ props =>( <UserDashboardPage {...props}
                                                            authenticated={ this.state.authenticated } 
                                                            authenticationToken={ this.state.authenticationToken }
                                                            setAuthenticated={ this.setAuthenticated }
                                                            setAuthenticatedUserData={ this.setAuthenticatedUserData } />
                )}/>
                <Route path="/signin" render={ props =>( <SigninPage {...props}
                                                            authenticated={ this.state.authenticated } 
                                                            setAuthenticated={ this.setAuthenticated }
                                                            setAuthenticationToken={ this.setAuthenticationToken }
                                                            />
                )}/>
                <Route path="/signup" component={ SignupPage }/>
                <Route path="/about" component={ AboutPage }/>
                <Route path="/investments" component={ InvestmentPage }/>
                <Route path="/faq" component={ FaqPage }/>
                <Route path="/contact_us" component={ ContactPage }/>
                <Route exact path="/" component={ HomePage }/>
              </Switch>
            </CSSTransition>
          </TransitionGroup>
      </div>
    );
  }
}

export default App;
