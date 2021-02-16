import React from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

class Index extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      search: undefined,
      searchString : '',
      results: [],
      start: 0,
      end: 10
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  handleSearch() {
    var url = `http://localhost:3000/events?q=${this.state.searchString}&_start=${this.state.start}&_end=${this.state.end}`;
    console.log('inside');
    axios.get(url)
      .then((data) => {
        this.setState({results: data.data}, () => {
          console.log(this.state);
        });
      })
      .catch((err) => {
        console.log(err);
      })
  }

  handlePageClick(data) {
    let selected = data.selected;
    console.log(data);
    this.setState({
      start: selected * 10,
      end: selected * 10 + 10
    })
    this.handleSearch()
  }

  componentDidMount() {
    this.handleSearch();
  }

  render() {
    return (<div>
      <div>Search Bar</div>
      <div>results</div>
      <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      </div>)
  }
}

export default Index;