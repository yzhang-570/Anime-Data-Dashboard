import React from 'react'

function Statistic({ stat, desc }) {
  return (
    <div className="stat-card-div">
        <h1>{stat}</h1>
        <p>{desc}</p>
    </div>
  )
}

export default Statistic
