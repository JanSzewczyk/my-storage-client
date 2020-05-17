import React from "react";
import PropTypes from "prop-types";

import "./Tile.scss";

const Tile = (props) => {
  const { children, header, top, bottom, tileSize } = props;
  console.log(tileSize);
  let tileClasses = ["tile"];

  tileClasses = tileClasses.concat(
    Object.keys(tileSize).map((key) => `tile--${tileSize[key]}`)
  );

  console.log(tileClasses);
  return (
    <div className={tileClasses.join(" ")}>
      {header && (
        <div className={"tile__header"}>
          <div className={"tile__left"}>
            <div className={"tile__title"}>Title</div>
            <div className={"tile__subtitle"}>Subtitle</div>
          </div>
          <div className={"tile__right"}>right</div>
        </div>
      )}
      {top && (
        <div className={"tile__top"}>
          <div className={"tile__left"}>TopLeft</div>
          <div className={"tile__right"}>TopRight</div>
        </div>
      )}
      <div className={"tile__content"}>{children}</div>
      {bottom && (
        <div className={"tile__bottom"}>
          <div className={"tile__left"}>BottomLeft</div>
          <div className={"tile__right"}>BottomRight</div>
        </div>
      )}
    </div>
  );
};

Tile.propTypes = {
  tileSize: PropTypes.shape({
    sm: PropTypes.oneOf([
      "sm-1",
      "sm-2",
      "sm-3",
      "sm-4",
      "sm-5",
      "sm-6",
      "sm-7",
      "sm-8",
      "sm-9",
      "sm-10",
      "sm-11",
      "sm-12",
    ]).isRequired,
    md: PropTypes.oneOf([
      "md-1",
      "md-2",
      "md-3",
      "md-4",
      "md-5",
      "md-6",
      "md-7",
      "md-8",
      "md-9",
      "md-10",
      "md-11",
      "md-12",
    ]).isRequired,
    lg: PropTypes.oneOf([
      "lg-1",
      "lg-2",
      "lg-3",
      "lg-4",
      "lg-5",
      "lg-6",
      "lg-7",
      "lg-8",
      "lg-9",
      "lg-10",
      "lg-11",
      "lg-12",
    ]).isRequired,
    xl: PropTypes.oneOf([
      "xl-1",
      "xl-2",
      "xl-3",
      "xl-4",
      "xl-5",
      "xl-6",
      "xl-7",
      "xl-8",
      "xl-9",
      "xl-10",
      "xl-11",
      "xl-12",
    ]).isRequired,
  }).isRequired,
  children: PropTypes.node,
  header: PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string,
    right: PropTypes.node,
  }),
  top: PropTypes.shape({
    left: PropTypes.node,
    right: PropTypes.node,
  }),
  botom: PropTypes.shape({
    left: PropTypes.node,
    right: PropTypes.node,
  }),
};

export default Tile;
