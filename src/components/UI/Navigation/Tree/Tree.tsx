import React from "react";

import "./Tree.scss";

const Tree = () => {
  return (
    <ul className={"tree"}>
      <li className={"item"}>
        <div className={"title"}>title12</div>
        <ul>
          <li className={"item"}>
            <div className={"title"}>title12</div>
          </li>
          <li className={"item"}>
            <div className={"title"}>title12</div>
          </li>
          <li className={"item"}>
            <div className={"title"}>title12</div>
          </li>
          <li className={"item"}>
            <div className={"title"}>title12</div>
          </li>
        </ul>
      </li>
      <li className={"item"}>
        <div className={"title"}>title12</div>
      </li>
      <li className={"item"}>
        <div className={"title"}>title12</div>
      </li>
    </ul>
  );
};

export default Tree;
