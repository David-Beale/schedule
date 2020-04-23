import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import { loadEvents } from './redux/actions';
import Login from './components/Login';
import Navigation from './components/Navigation';
import Main from './components/Main';
import './App.css';

function App() {
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
        <Route exact path="/" component={Main} />
        <Route path="/login" component={Login} />
        {/* <Route path="/projects" component={ProjectsPage} /> */}
      </AnimatedSwitch>
    </Router>
  );
}

export default App;
