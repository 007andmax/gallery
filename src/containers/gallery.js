import React, { Component } from "react";
import { connect } from "react-redux";
import ReactDOM from "react-dom";
import { ADD_IMAGES } from "../constants/gallery";
import { SEARCH_NAME, CLEAR_SEARCH } from "../constants/search";
import { setCountSearchItem } from "../actions/search";
import "../assets/css/gallery.css";

class Gallery extends Component {
  full_list;
  initSearch = false;
  nameForSearch = "";
  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
    this.onInitEditName = this.onInitEditName.bind(this);
    this.onKeyUpEditName = this.onKeyUpEditName.bind(this);
  }
  onKeyUpEditName(e) {
    if (e.keyCode === 13 && e.target.value !== "") {
      let index = Number(e.target.parentNode.getAttribute("index"));
      let list = this.state.list;
      list[index].name = e.target.value;
      this.setState({ list: list });
      const node = ReactDOM.findDOMNode(this);
      let listEditName = node.querySelectorAll(".edit-name");
      this.hideAllEditName(listEditName);
    }
  }
  hideAllEditName(list) {
    for (let i = 0; i < list.length; i++) {
      list[i].style.display = "none";
      list[i].parentNode.querySelector("p").style.display = "block";
    }
  }
  onInitEditName(e) {
    let index = Number(e.target.parentNode.getAttribute("index"));
    const node = ReactDOM.findDOMNode(this);
    let listEditName = node.querySelectorAll(".edit-name");
    this.hideAllEditName(listEditName);
    let item = listEditName[index];
    item.style.display = "block";
    item.parentNode.querySelector("p").style.display = "none";
    item.value = this.state.list[index].name;
  }
  addItems(images) {
    return this.state.list.concat(
      images.map(item => {
        return {
          images: URL.createObjectURL(item),
          name: item.name.substring(0, item.name.lastIndexOf("."))
        };
      })
    );
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.gallery.action && nextProps.gallery.action === ADD_IMAGES) {
      this.full_list = this.addItems(nextProps.gallery.images);
      if (this.initSearch) {
        this.onInitSearch();
      } else {
        this.setState({
          list: this.addItems(nextProps.gallery.images)
        });
      }
    }
    if (nextProps.search.action && nextProps.search.action === SEARCH_NAME) {
      this.nameForSearch = nextProps.search.name;
      this.onInitSearch();
    }
    if (nextProps.search.action && nextProps.search.action === CLEAR_SEARCH) {
      this.initSearch = false;
      this.setState({ list: this.full_list });
    }
  }
  onInitSearch() {
    let result = this.full_list.filter(item =>
      item.name.includes(this.nameForSearch)
    );
    this.setState({ list: result });
    this.props.setCountSearchItem(result.length);
    this.initSearch = true;
  }
  render() {
    return (
      <div className="gallery">
        <div className="gallery-content">
          <div className="gallery-grid">
            {this.state.list.map((item, index) => {
              return (
                <div key={index} index={index} className="gallery-item">
                  <img src={item.images} />
                  <p onClick={this.onInitEditName}>{item.name}</p>
                  <input
                    className="edit-name"
                    type="text"
                    onKeyUp={this.onKeyUpEditName}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

let mapStateToProps = state => {
  return { gallery: state.galleryState, search: state.searchState };
};
let mapDispatchToProps = dispatch => {
  return {
    setCountSearchItem: count => {
      dispatch(setCountSearchItem(count));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Gallery);
