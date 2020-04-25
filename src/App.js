import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AnimatedSwitch } from "react-router-transition";

import Navigation from './components/Navigation';
import Main from './components/Main';
import EventForm from './components/EventForm';
import Event from './components/Event';

import './App.css';

function App () {
  return (
    <Router>
      <Navigation/>
      <AnimatedSwitch
        atEnter={{ opacity: 0 }}
        atLeave={{ opacity: 0 }}
        atActive={{ opacity: 1 }}
        className="switch-wrapper"
      >
        <Route exact path="/" component={Main} />
        <Route exact path="/submit" component={EventForm} />
        <Route exact path="/event/:id" component={Event} />
        {/* <Route path="/about" component={AboutPage} /> */}
        {/* <Route path="/contact" component={ContactPage} /> */}
        {/* <Route path="/projects" component={ProjectsPage} /> */}
      </AnimatedSwitch>

    </Router>
  );
}

export default App;
