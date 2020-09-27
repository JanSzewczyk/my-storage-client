import React from "react";
import Loader from "react-loader-spinner";

import "./Loading.scss";

interface LoadingProps {}

const Loading: React.FC<LoadingProps> = (props) => (
  <div className={"loading"}>
    <Loader type="BallTriangle" color={"#0082f0"} width={120} height={80} />
  </div>
);

export default Loading;
