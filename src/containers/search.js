import React, { Component } from "react";
import { connect } from "react-redux";
import ReactDOM from "react-dom";
import {SearchByName,clearSerch} from "../actions/search";
import {COUNT_SEARCH} from "../constants/search";
import "../assets/css/search.css";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
        count: 0
      };
    this.onKeyUpSearch = this.onKeyUpSearch.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.search.action && nextProps.search.action === COUNT_SEARCH) {
      this.setState({
        count: nextProps.search.count
      });
      const node = ReactDOM.findDOMNode(this);
      node.querySelector(".count-find").style.display = "block";
    }
   
  }
  onKeyUpSearch(e) {
    if (e.keyCode === 13 && e.target.value !== "") {
        this.props.SearchByName(e.target.value);
     
    }
    if (e.target.value === "")
    {
        this.setState({
            count: 0
          });
          const node = ReactDOM.findDOMNode(this);
          node.querySelector(".count-find").style.display = "none";
          this.props.clearSerch();

    }
  }
  render() {
    return (
      <div className="search">
    <div className="search-body">
    <input type="text" placeholder="Пойск" onKeyUp={this.onKeyUpSearch} />
    <div className="count-find"><p>Найдено: {this.state.count}</p></div>
    </div>
      </div>
    );
  }
}

let mapStateToProps = state => {
  return { search: state.searchState };
};

let mapDispatchToProps = dispatch => {
  return {
    SearchByName: (images) => {
      dispatch(SearchByName(images));
    },
    clearSerch: () => {
        dispatch(clearSerch());
      }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);

