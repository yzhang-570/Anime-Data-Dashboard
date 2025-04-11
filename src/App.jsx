import React, { useState, useEffect } from 'react'
import "./App.css"
import DataColumn from "./components/DataColumn.jsx"
import Statistic from "./components/Statistic.jsx"

function App() {
  const API_KEY = import.meta.env.VITE_API_KEY
  const[animeData, setAnimeData] = useState([])
  const[animeInfo, setAnimeInfo] = useState([]) //hold what is actually being displayed

  const [searchText, setSearchText] = useState("")
  const[sliderValue, setSliderValue] = useState(0)
  /*
  1. (done) display 10 recipes and 2+ stats for each
  2. search
  3. filtering
  4. summary stats
  */

  console.log(animeData)
  useEffect(() => {
    const fetchAnimeData = async () => {
      // fetch [number] animes
      var response = await fetch("https://api.jikan.moe/v4/anime?limit=15&sfw=true")
      var data = await response.json()
      setAnimeData(data.data)
      setAnimeInfo(data.data)
    }
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
          <Statistic stat={"One Piece"} desc={"Most Number of Episodes"}/>
          <Statistic stat={"8.88"} desc={"Highest Rating"}/>
          {/* <Statistic stat={stats["Top Review"]} desc={"Top Review"}/> */}
        </div>
        <div id="data-search-div">
          <div id="search-div">
            <input id="search-bar" type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="Search name"/>
            <button type="submit" onClick={handleSearch}>Search</button>
            <div id="slider-div">
              <p>Minimum Rating:</p>
              <p>0</p>
              <input type="range" min="0" max="10" value={sliderValue} onChange={(e) => setSliderValue(e.target.value)}/>
              <p>10</p>
            </div>
          </div>
          <div id="datacolumns-div">
            <DataColumn animeInfo={animeInfo} dataTypeTitle={"Name"} dataType={"title"}/>
            <DataColumn animeInfo={animeInfo} dataTypeTitle={"Episodes"} dataType={"episodes"}/>
            <DataColumn animeInfo={animeInfo} dataTypeTitle={"Rating/10"} dataType={"score"}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App



  // Object.keys(stats).length !== 0 ? 
  // (
  //   // <>
  //   //   {Object.keys(stats).map((description) => (
  //   //     <Statistic stat={stats[description]} desc={description} key={description}/>
  //   //   ))}
  //   // </>
  //   <>
  //     <Statistic stat={stats["Top Anime"]} desc={"Top Anime"}/>
  //     <Statistic stat={stats["Top Character"]} desc={"Top Character"}/>
  //     <Statistic stat={stats["Top Review"]} desc={"Top Review"}/>
  //   </>
  // )
  // :
  // (
  //   <p>Loading...</p>
  // )
