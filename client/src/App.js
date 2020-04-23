import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import { loadEvents } from './redux/actions';
import Login from './components/Login';
import Navigation from './components/Navigation';
import Main from './components/Main';
import './App.css';
import { useStitchAuth } from './components/StitchAuth';
import LogoutScreen from './components/LogoutScreen';

export default function App() {
  const { isLoggedIn } = useStitchAuth();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(() => loadEvents());
  }, []);
  return (
    <Router>
      <Navigation />
      <AnimatedSwitch
        atEnter={{ opacity: 0 }}
        atLeave={{ opacity: 0 }}
        atActive={{ opacity: 1 }}
        className="switch-wrapper"
      >
        {isLoggedIn ? (
          <Redirect from="/login" to="/" component={Main} />
        ) : (
          <Route path="/login" component={Login} />
        )}
        <Route path="/logout" component={LogoutScreen}></Route>
        <Route exact path="/" component={Main} />
        {/* 
        <Route path="/projects" component={ProjectsPage} />
         */}
      </AnimatedSwitch>
    </Router>
  );
}

