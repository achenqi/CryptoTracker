import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }

  render() {
    return <input onChange={this.props.handleInput}></input>
  }
}

export default Search;