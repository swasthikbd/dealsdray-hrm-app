import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import EmployeeList from './components/EmployeeList';
import dealsdray_logo from './components/dealsdray_logo.jpeg';
import EmployeeForm from './components/EmployeeForm';
import './App.css';

function App() {
  return (
    
    <Router>
        <div className="App">
        <header className="App-header">
          <img src={dealsdray_logo} className="App-logo" alt="logo" />
        </header>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/employee" component={EmployeeList} />
          <Route path="/create-employee" component={EmployeeForm} />
          <Route path="/edit-employee/:id" component={EmployeeForm} />
          <Route path="/" exact component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;