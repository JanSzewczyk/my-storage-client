import React from "react";

import Loading from "../../UI/Loading/Loading";

import "./Welcome.scss";

const Welcome = React.memo((props) => {
  return (
    <div className={"welcome"}>
      <Loading />
      <h1>Welcome</h1>
    </div>
  );
});

export default Welcome;
