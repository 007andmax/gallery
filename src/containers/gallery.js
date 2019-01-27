import React, { Component } from "react";
import { connect } from "react-redux";
import ReactDOM from "react-dom";
import { ADD_IMAGES } from "../constants/gallery";
import "../assets/css/gallery.css";

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
    this.onInitEditName = this.onInitEditName.bind(this);
    this.onKeyUpEditName = this.onKeyUpEditName.bind(this);
  }
  onKeyUpEditName(e) {
    if (e.keyCode === 13) {
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
  componentWillReceiveProps(nextProps) {
    if (nextProps.gallery.action && nextProps.gallery.action === ADD_IMAGES) {
      this.setState({
        list: this.state.list.concat(
          nextProps.gallery.images.map(item => {
            return {
              images: URL.createObjectURL(item),
              name: item.name.substring(0, item.name.lastIndexOf("."))
            };
          })
        )
      });
    }
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
  return { gallery: state.galleryState };
};

export default connect(mapStateToProps)(Gallery);
