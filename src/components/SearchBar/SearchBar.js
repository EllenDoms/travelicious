import React from 'react';
import './SearchBar.css';

const sortByOptions = {
  'Best Match': 'best_match',
  'Highest Rated': 'rating',
  'Most Reviewed': 'review_count'
}

export default class SearchBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {term: '', location: '', sortBy: 'best_match'};
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }
  renderSortByOptions() {
    return Object.keys(sortByOptions).map(sortByOption => {
      let sortByOptionValue = sortByOptions[sortByOption];
      return <li className={this.getSortByClass(sortByOptionValue)} key={sortByOptionValue} onClick={this.handleSortByChange.bind(this, sortByOptionValue)}>{sortByOption}</li>
    })
  }
  getSortByClass(sortByOption) {
    return this.state.sortBy === sortByOption ? 'active' : '';
  }
  handleSortByChange(sortByOption) {
    this.setState({sortBy: sortByOption});
  }
  handleTermChange(event) {
    this.setState({term: event.target.value});
  }
  handleLocationChange(event) {
    this.setState({location: event.target.value});
  }
  handleEnter(target) {
    if(target.charCode === 13){
            this.handleSearch(target);
    }
  }
  handleSearch(event) {
    this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
    event.preventDefault();
  }

  render() {
    return(
      <div className="SearchBar">
        <div className="SearchBar-sort-options">
          <ul>
            {this.renderSortByOptions()}
          </ul>
        </div>
        <div className="SearchBar-fields">
          <input placeholder="Search Businesses" onChange={this.handleTermChange} onKeyPress={this.handleEnter} />
          <input placeholder="Where?" onChange={this.handleLocationChange} onKeyPress={this.handleEnter} />
        </div>
        <div className="SearchBar-submit">
          <a onClick={this.handleSearch}>Let's Go</a>
        </div>
      </div>
    )
  }
}
