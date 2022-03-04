import React, { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";

function GallaryCarousel(props) {
  const { imagelist, selected_picture } = props;
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    setIndex(imagelist.indexOf(selected_picture));
  }, [selected_picture]);

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {imagelist.map((image) => (
        <Carousel.Item key={image.id}>
          <img
            className="d-block w-100"
            src={`http://localhost:8000${image.picture}`}
            alt="First slide"
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default GallaryCarousel;
