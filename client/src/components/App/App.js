import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';

import Navigation from '../Navigation';
import Schedule from '../Schedule';
import EventForm from '../EventForm';
import Landing from '../Landing';

function App() {
  return (
    <Router>
      <Navigation />
      <AnimatedSwitch
        atEnter={{ opacity: 0 }}
        atLeave={{ opacity: 0 }}
        atActive={{ opacity: 1 }}
        className='switch-wrapper'
      >
        <Route exact path='/' component={Landing} />
        <Route exact path='/schedule' component={Schedule} />
        <Route exact path='/submit' component={EventForm} />
      </AnimatedSwitch>
    </Router>
  );
}

export { App as default };
