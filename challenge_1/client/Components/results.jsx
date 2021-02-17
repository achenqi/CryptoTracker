import React from 'react';
import ResultDetail from './resultDetail.jsx';


function Results(props) {
  return <ul>
    {props.results.map((data) => {
      return <ResultDetail description = {data.description}/>
    })
  }
  </ul>
}

export default Results;