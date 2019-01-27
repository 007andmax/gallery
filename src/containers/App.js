import React, { Component } from "react";
import Gallery from "./gallery";
import Search from "./search";
import UploadImages from "./upload-images";
import "../assets/css/update.css";
import "../assets/css/app.css";
class App extends Component {
  render() {
    return (
      <div className="app-fon">
      <Search />
        <Gallery />
       <UploadImages />
      </div>
    );
  }
}
export default App;