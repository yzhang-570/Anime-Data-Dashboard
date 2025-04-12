import React, {useState, useEffect} from 'react'
import './index.css'
import App from './App.jsx'

import Dashboard from "./pages/Dashboard.jsx"
import Graphs from "./pages/Graphs.jsx"

import { BrowserRouter, Routes, Route } from 'react-router-dom'

function Layout() {
  const[animeData, setAnimeData] = useState([])
  const[animeInfo, setAnimeInfo] = useState([]) //hold what is actually being displayed
  const[stats, setStats] = useState({})

  const [searchText, setSearchText] = useState("")
  const[sliderValue, setSliderValue] = useState(0)

  useEffect(() => {
  const fetchAnimeData = async () => {
      // fetch [number] animes
      var response = await fetch("https://api.jikan.moe/v4/anime?limit=15&sfw=true")
      var data = await response.json()
      setAnimeData(data.data)
      setAnimeInfo(data.data)

      var response1 = await fetch("https://api.jikan.moe/v4/top/anime?limit=1")
      var data1 = await response1.json()
      const newStats = {...stats, "Top Anime": data1.data[0].title}
      setStats(newStats)
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

  const handleSearchChange = (e) => {
    setSearchText(e.target.value)
  }

  const handleSliderChange = (e) => setSliderValue(e.target.value)

  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}>
                <Route index={true} element={<Dashboard animeInfo={animeInfo} stats={stats} searchText={searchText} sliderValue={sliderValue}
                  handleSearch={handleSearch} handleSearchChange={handleSearchChange} handleSliderChange={handleSliderChange} />} />
                <Route path="graphs" element={<Graphs animeData={animeData}/>} />
            </Route >
        </Routes>
    </BrowserRouter>  
  )
}

export default Layout
