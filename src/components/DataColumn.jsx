import React from 'react'
import "../DataColumn.css"

function DataColumn({ animeInfo, dataTypeTitle, dataType}) {

    return (
        <div className="data-div">
            <h2>{dataTypeTitle}</h2>
            {animeInfo && animeInfo.map((anime) => (
                <div className="data-row" key={anime.mal_id}>
                    {
                        anime[dataType] == null || anime[dataType] == undefined ? (
                            <p>Unknown</p>
                        )
                        :
                        (
                            <p>{anime[dataType]}</p>
                        )
                    }
                </div>
            ))}
        </div>
    )
}

export default DataColumn
