import React, {useState, useEffect} from 'react';

function Search (props) {

  return (<form autoComplete="off" className ='search-container'>
      <input className ="search-bar" placeholder="Search CryptoCurrency" onChange={props.search}></input>
      <ul className='results-container'>
        {props.results.map((result) => <li className ="result" onClick={props.click} data-tag={result.symbol}>{result.id} / {result.symbol.toUpperCase()}</li>)}
      </ul>
    </form>)
}

export default Search;