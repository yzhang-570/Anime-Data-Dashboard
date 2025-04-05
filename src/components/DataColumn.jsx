import React from 'react'
import "../DataColumn.css"

function DataColumn({ recipesInfo, dataTypeTitle, dataType}) {
    return (
        <div className="data-div">
            <h2>{dataTypeTitle}</h2>
            {recipesInfo.map((recipe) => (
            <div className="data-row" key={recipe.id}>
                <p>{recipe[dataType]}</p>
            </div>
            ))}
        </div>
    )
}

export default DataColumn
