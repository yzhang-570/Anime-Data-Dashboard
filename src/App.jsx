import React, { useState, useEffect } from 'react'
import "./App.css"
import DataColumn from "./components/DataColumn.jsx"
import Statistic from "./components/Statistic.jsx"

function App() {
  const API_KEY = import.meta.env.VITE_API_KEY
  const[animeData, setAnimeData] = useState([])
  const[animeInfo, setAnimeInfo] = useState([]) //hold what is actually being displayed

  const[stats, setStats] = useState({})

  const [searchText, setSearchText] = useState("")
  const[sliderValue, setSliderValue] = useState(0)
  /*
  1. (done) display 10 recipes and 2+ stats for each
  2. search
  3. filtering
  4. summary stats
  */

  const fetchAnimeData = async () => {
    // fetch [number] animes
    var response = await fetch("https://api.jikan.moe/v4/anime?limit=15&sfw=true")
    var data = await response.json()
    setAnimeData(data.data)
    setAnimeInfo(data.data)

    //fetch top anime
    var response1 = await fetch("https://api.jikan.moe/v4/top/anime?limit=1")
    var data1 = await response1.json()
    const newStats = stats
    newStats["Top Anime"] = data1.data[0].title
    console.log(data1)

    // //fetch top character
    var response2 = await fetch("https://api.jikan.moe/v4/top/characters?limit=1")
    var data2 = await response2.json()
    newStats["Top Character"] = data2.data[0].name
    console.log(data2)

    // //fetch top manga
    var response3 = await fetch("https://api.jikan.moe/v4/top/manga?limit=1")
    var data3 = await response3.json() 
    console.log(data3)
    newStats["Top Anime"] = data3.data[0].title

    console.log(newStats)
    setStats(newStats)
  }

  useEffect(() => {
    fetchAnimeData()
  }, [])

  const handleSearch = async (e) => {
    const searchCriteria = searchText.toLowerCase()
    // const response = await fetch(`https://api.jikan.moe/v4/anime?q=${searchCriteria}&limit=20&sfw=true`)
    // const data = await response.json()
    // setAnimeInfo(data.data)
    setAnimeInfo(animeData.filter((anime) => (
      anime.score >= sliderValue && anime.title.toLowerCase().includes(searchCriteria)
    )))
    setSearchText("")
  }

  return (
    <div id="main-div">
      <div id="sidebar-div" className="center-children">
        <h1>sidebar</h1>
      </div>
      <div id="dashboard-div" className="center-children">
        <div id="stat-div">
          {
            Object.keys(stats).length !== 0 ? 
            (
              // <>
              //   {Object.keys(stats).map((description) => (
              //     <Statistic stat={stats[description]} desc={description} key={description}/>
              //   ))}
              // </>
              <>
                <Statistic stat={stats["Top Anime"]} desc={"Top Anime"} key={"Top Anime"}/>
                <Statistic stat={stats["Top Character"]} desc={"Top Character"} key={"Top Character"}/>
              </>
            )
            :
            (
              <p>Loading...</p>
            )
          }
        </div>
        <div id="search-div">
          <input id="search-bar" type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="Search name"/>
          <div id="slider-div">
            <p>Minimum Rating:</p>
            <p>0</p>
            <input type="range" min="0" max="10" value={sliderValue} onChange={(e) => setSliderValue(e.target.value)}/>
            <p>10</p>
          </div>
          <button type="submit" onClick={handleSearch}>Search</button>
        </div>
        <div id="datacolumns-div">
          <DataColumn animeInfo={animeInfo} dataTypeTitle={"Name"} dataType={"title"}/>
          <DataColumn animeInfo={animeInfo} dataTypeTitle={"Episodes"} dataType={"episodes"}/>
          <DataColumn animeInfo={animeInfo} dataTypeTitle={"Rating/10"} dataType={"score"}/>
        </div>
      </div>
    </div>
  )
}

export default App
