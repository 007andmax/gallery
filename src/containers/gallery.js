import React, { Component } from "react";
import { connect } from "react-redux";
import ReactDOM from "react-dom";
import {ADD_IMAGES } from "../constants/gallery";

import "../assets/css/gallery.css";

class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
          list: []
        };
        this.EditName = this.EditName.bind(this);
      }
      EditName(e) {
let index = Number(e.target.getAttribute('index'));
const node = ReactDOM.findDOMNode(this);
let item =  node.querySelectorAll(".edit-name")[index];
console.log("item",item);
      }
      componentWillReceiveProps(nextProps) {
        if (nextProps.gallery.action && nextProps.gallery.action === ADD_IMAGES) {
          this.setState({
            list: this.state.list.concat(nextProps.gallery.images.map((item) => {
                return   {images: URL.createObjectURL(item),name: item.name}
            }))
          });
        }
      }
  render() {
    return (
      <div className="gallery">
        <div className="gallery-content">
         <div className="gallery-grid">
         {
             this.state.list.map((item,index) => {
                 return (<div key={index} className="gallery-item">
                 <img src={item.images} />
                 <p index={index} onClick={this.EditName}>{item.name}</p>
                 <input className="edit-name" type="text" />
                 </div>)
             })
         }
         </div>
        </div>
      </div>
    );
  }
}

let mapStateToProps = state => {
    return { gallery: state.galleryState };
  };

  export default connect(
    mapStateToProps
  )(Gallery);
  
