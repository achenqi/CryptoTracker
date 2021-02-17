import React from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import Results from './results.jsx';
import Search from './search.jsx';

class Index extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      search: undefined,
      searchString : '',
      results: [],
      start: 0,
      end: 10,
      total: 0
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  handleSearch() {
    var url = `http://localhost:3000/events?q=${this.state.searchString}&_start=${this.state.start}&_end=${this.state.end}`;
    axios.get(url)
      .then((data) => {
        this.setState({results: data.data, total: data.headers['x-total-count']}, () => {
        });
      })
      .catch((err) => {
        console.log(err);
      })
  }

  handleInput(event) {
    this.setState({
      searchString: event.target.value,
      start: 0,
      end: 10
    }, this.handleSearch);
  }

  handlePageClick(data) {
    let selected = data.selected;
    this.setState({
      start: selected * 10,
      end: selected * 10 + 10
    }, this.handleSearch)

  }

  componentDidMount() {
    this.handleSearch();
  }

  render() {
    return (<div>
      <Search handleInput = {this.handleInput}/>
      <Results results={this.state.results}/>
      <ReactPaginate
          previousLabel={'<<'}
          nextLabel={'>>'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={Math.ceil(this.state.total/10)}
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