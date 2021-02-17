import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }

  render() {
    return (
      <div class="search-box">
        <div class="outline">
        <label class="form-label" for="form1">Search</label>
          <input type="search" id="form1" class="search" onChange={this.props.handleInput} placeholder= "Type here"/>
        </div>
      </div>
    )
  }
}

export default Search;