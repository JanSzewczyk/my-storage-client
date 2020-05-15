import React from "react";
import Loader from "react-loader-spinner";

const Loading = (props) => (
  <div className={"loading"}>
    <Loader type="BallTriangle" color={"#0082f0"} width={120} height={80} />
  </div>
);

export default Loading;
