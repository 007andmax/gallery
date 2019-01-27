
import {ADD_IMAGES} from "../constants/gallery";

export function AddImages(images) {
    return { type: ADD_IMAGES, images:images};
}
