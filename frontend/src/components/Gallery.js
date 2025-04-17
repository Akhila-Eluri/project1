import React from "react";
import "./Gallery.css";

const images = [
  '/images/photo1.jpg',
  '/images/photo2.jpg',
  '/images/photo3.jpg',
  '/images/photo4.jpg',
  '/images/photo5.jpg',
  '/images/photo6.jpg',
  '/images/photo7.jpg',
  '/images/photo8.jpg',
  '/images/photo9.jpg',
  '/images/photo10.jpg',
];

const Gallery = () => {
  return (
    <div className="gallery-section">
      <div className="gallery-scroll">
        {images.map((img, index) => (
          <img key={index} src={img} alt={`Hclicks work ${index + 1}`} className="gallery-image" />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
