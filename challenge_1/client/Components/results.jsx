import React from 'react';
import ResultDetail from './resultDetail.jsx';


function Results(props) {
  return <ul className = 'resultsContainer'>
    {props.results.map((data) => {
      return <ResultDetail {...data}/>
    })
  }
  </ul>
}

export default Results;