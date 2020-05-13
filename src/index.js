import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import Header from './components/Header';
import Footer from './components/Footer';
import ChoresList from "./components/ChoresList";
import GroupsList from "./components/GroupsList";
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
      <Router>
          <div className="App-wrapper">
              <Header />
              <div className="App-content">
                  <Route exact path="/" component={App} />
                  <Route exact path="/chores" component={ChoresList} />
                  <Route exact path="/groups" component={GroupsList} />
              </div>
              <Footer />
          </div>
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
