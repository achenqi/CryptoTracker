import React from 'react';

function ResultDetail(props) {
  console.log(props);
  return <div><li>
    {props.description}
    </li>
          <span className='listHover'>
          <ul>
            <li>Location: {props.category2}</li>
            <li>Date: {props.date}</li>
          </ul>
        </span>
        </div>
}

export default ResultDetail;