
 import {ADD_IMAGES } from "../constants/gallery";

 const initialState = {};
 const galleryReducer = function(state = initialState, action) {
   switch (action.type) {
     case ADD_IMAGES:
       return { action: ADD_IMAGES, images: action.images };
     default:
       return { action: "", data: initialState };
   }
   return state;
 };
 export default galleryReducer;
 