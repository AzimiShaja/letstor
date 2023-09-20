import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const ImageSlider = ({ imgs }) => {
  return (
    <div>
      <Slide>
        {imgs.map((slideImage, index) => (
          <div key={index}>
            <img
              src={slideImage}
              className="min-h-[400px] max-h-[600px] object-cover w-full"
            />
          </div>
        ))}
      </Slide>
    </div>
  );
};
export default ImageSlider;
