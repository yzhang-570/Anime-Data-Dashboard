import React from 'react'
import "./App.css"
import { Outlet, Link } from 'react-router-dom'

/*
1. (done) display 10 recipes and 2+ stats for each
2. search
3. filtering
4. summary stats
*/

function App() {
  const API_KEY = import.meta.env.VITE_API_KEY

  return (
    <div id="main-div">
      <div id="sidebar-div" className="center-children">
        <div id="sidebar-header">
          <h1> Menu </h1>
          <button id="sidebar-btn"> {"<<"} </button>
        </div>
        <Link to="/"><h2 className="link"> Home </h2></Link>
        <Link to="/graphs" className="link"><h2> Graphs </h2></Link>
      </div>
      
      <Outlet />
    </div>
  )
}

export default App
