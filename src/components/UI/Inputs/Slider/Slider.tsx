import React from "react";

import "./Slider.scss";

interface SliderProps {}

const Slider: React.FC<SliderProps> = ({}) => {
  return (
    <div className={"slider"}>
      <input type={"range"} />
      <div className={"slider__limits"}>
        <span className={"slider__from"}>1</span>
        <span className={"slider__to"}>100</span>
      </div>
    </div>
  );
};

export default Slider;
