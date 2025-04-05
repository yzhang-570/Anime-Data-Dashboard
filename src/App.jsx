import React, { useState, useEffect } from 'react'
import "./App.css"
import DataColumn from "./components/DataColumn.jsx"

function App() {
  const API_KEY = import.meta.env.VITE_API_KEY
  const [recipesInfo, setRecipesInfo] = useState([])
  /*
  1. display 10 recipes and 2+ stats for each
  2. search
  3. filtering
  4. summary stats
  */
  const fetchRecipeInfo = async () => {
    // fetch [number] recipes
    const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?number=2&apiKey=${API_KEY}`)
    const data = await response.json()
    const recipes = data.results

    // fetch and store details about each recipe
    for(const recipe of recipes) {
      const id = recipe.id
      const response2 = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)
      const data2 = await response2.json()
      // console.log(data2)
      setRecipesInfo((prev) => ([...prev,
        {
          "id": recipe.id,
          "name": recipe.title,
          "cookingMinutes": data2.readyInMinutes,
          "healthScore": data2.healthScore
        }
      ]))
    }
  }
  // console.log(recipesInfo)

  useEffect(() => {
    fetchRecipeInfo()
  }, [])

  return (
    <div id="main-div">
      <div id="sidebar-div" className="center-children">
        <h1>sidebar</h1>
      </div>
      <div id="dashboard-div" className="center-children">
        <DataColumn recipesInfo={recipesInfo} dataTypeTitle={"Recipe Name"} dataType={"name"}/>
        <DataColumn recipesInfo={recipesInfo} dataTypeTitle={"Time To Prepare"} dataType={"cookingMinutes"}/>
        <DataColumn recipesInfo={recipesInfo} dataTypeTitle={"Health Score"} dataType={"healthScore"}/>
      </div>
    </div>
  )
}

export default App
