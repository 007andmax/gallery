import React, { Component } from "react";
import ImageUploader from "react-images-upload";
import { connect } from "react-redux";
import {AddImages} from "../actions/gallery";
import "../assets/css/upload-images.css";

class UploadImages extends Component {
  constructor(props) {
    super(props);
    this.onDrop = this.onDrop.bind(this);
  }
  
  onDrop(picture) {
    this.props.AddImages(picture);
}
  render() {
    return (
      <div className="upload-images">
         <ImageUploader
                	withIcon={true}
                	buttonText="Choose images"
                	onChange={this.onDrop}
                	imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                	maxFileSize={5242880}
            />

      </div>
    );
  }
}

let mapStateToProps = state => {
  return { gallery: state.galleryState };
};

let mapDispatchToProps = dispatch => {
  return {
    AddImages: (images) => {
      dispatch(AddImages(images));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadImages);

