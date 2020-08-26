import React from 'react';
import './App.css';
import Nav from "./components/nav/Nav"
import Overall from "./components/overall/about"
import Home from "./components/home/home"
import Daily from "./components/daily/daily"
import Footer from "./components/footer/footer"
import {BrowserRouter, Switch, Route} from "react-router-dom"

function App () {
  return (
    <div className="all">
      <BrowserRouter>  
        <Nav/>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/overall' component={Overall}/>
            <Route path='/daily' component={Daily}/>
        </Switch>
        <Footer/>
      </BrowserRouter>
    </div>
  )
}

export default App   