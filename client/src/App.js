import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import { loadEvents } from './redux/actions';
import Login from './components/Login';
import Navigation from './components/Navigation/Navigation';
import NoMatch from './components/NoMatch/NoMatch';
import Schedule from './components/Schedule';
import EventForm from './components/EventForm';
import Landing from './components/Landing';
import { useStitchAuth } from './components/StitchAuth/StitchAuth';
import LogoutScreen from './components/LogoutScreen/LogoutScreen';
import About from './components/About/About';

function App() {
  const { isLoggedIn } = useStitchAuth();
  console.log(isLoggedIn)
  const dispatch = useDispatch();
  const { events } = useSelector(({ eventsReducer }) => eventsReducer);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(loadEvents());
    }
  }, [isLoggedIn]);

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
          <Redirect from="/login" to="/" component={Landing} />
        ) : (
          <Route path="/login" component={Login} />
        )}
        <Route exact path="/" component={Landing} />
        <Route exact path="/logout" component={LogoutScreen}></Route>
        <Route exact path="/schedule" component={Schedule} />
        <Route exact path="/about" component={About} />
        {isLoggedIn && <Route exact path="/form" component={EventForm} />}
        <Route component={NoMatch} />
      </AnimatedSwitch>
    </Router>
  );
}

export { App as default };
