import "../App.css"
import DataColumn from "../components/DataColumn.jsx"
import Statistic from "../components/Statistic.jsx"
import React, { useState, useEffect } from 'react'

function Dashboard( {animeInfo, stats, searchText, sliderValue, handleSearch, handleSearchChange, handleSliderChange }) {

    return (
        <div id="dashboard-div" className="center-children">
            <div id="stat-div">
                <Statistic stat={"One Piece"} desc={"Most Number of Episodes"}/>
                <Statistic stat={"8.88"} desc={"Highest Rating"}/>
                <Statistic stat={stats["Top Anime"]} desc={"Most Popular"}/>
            </div>
            <div id="data-search-div">
                <div id="search-div">
                <input id="search-bar" type="text" value={searchText} onChange={handleSearchChange} placeholder="Search name"/>
                <button id="search-btn" type="submit" onClick={handleSearch}>Search</button>
                <div id="slider-div">
                    <p>Minimum Rating:</p>
                    <p>0</p>
                    <input type="range" min="0" max="10" value={sliderValue} onChange={handleSliderChange}/>
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
    )
}

export default Dashboard
