import React, { useEffect, useState } from 'react'
import PieChart from '../components/PieChart.jsx'

import "../Graphs.css"

function Graphs({ animeData }) {

  const [chartData, setChartData] = useState({})

  useEffect(() => {
    const analyzeGenreAndDemographics = () => {
      const genreCount = {}
      animeData.forEach((anime) => {
        // console.log(anime)
        anime.genres.forEach((genre) => {
          const genreName = genre.name
          if(genreName in genreCount) {
            genreCount[genreName] += 1
          }
          else {
            genreCount[genreName] = 1
          }
        })
      })
      
      //return as separate arrays (genre and count)
      var genres = []
      var freqs = []
      Object.entries(genreCount).forEach(([genre, count]) => {
        genres = [...genres, genre]
        freqs = [...freqs, count]
      })

      const demogrCount = {}
      animeData.forEach((anime) => {
        // console.log(anime)
        anime.demographics.forEach((demogr) => {
          const demogrName = demogr.name
          if(demogrName in demogrCount) {
            demogrCount[demogrName] += 1
          }
          else {
            demogrCount[demogrName] = 1
          }
        })
      })
      
      //return as separate arrays (genre and count)
      var demographics = []
      var freqs2 = []
      Object.entries(demogrCount).forEach(([demogr, count]) => {
        demographics = [...demographics, demogr]
        freqs2 = [...freqs2, count]
      })
      setChartData({...chartData, genreChartData: [genres, freqs], demogrChartData: [demographics, freqs2]})
    }

    analyzeGenreAndDemographics()
  }, [animeData])

  return (
    <div id="graphs-div">
      <div id="header-div">
        <h1>Anime Charts</h1>
      </div>
      <div className="chart-div">
        {
          Object.keys(chartData).length !== 0 &&
          <>
            <h2>Genre</h2>
            <PieChart labelNames={chartData.genreChartData[0]} dataValues={chartData.genreChartData[1]}/>
            <h2>Demographics</h2>
            <PieChart labelNames={chartData.demogrChartData[0]} dataValues={chartData.demogrChartData[1]}/>
          </>
        }
      </div>
    </div>
  )
}

export default Graphs
