import React from "react";
import PropTypes from "prop-types";

import "./Tile.scss";

const Tile = (props) => {
  const { children, tileClass, header, tileSize } = props;

  let tileClasses = ["tile"];

  tileClasses = tileClasses.concat(
    Object.keys(tileSize).map((key) => `tile--${tileSize[key]}`)
  );

  tileClass && tileClasses.push(tileClass);

  return (
    <div className={tileClasses.join(" ")}>
      {header && (
        <div className={"tile__header"}>
          <div className={"tile__left"}>
            <div className={"tile__title"}>{header.title}</div>
            <div className={"tile__subtitle"}>{header.subtitle}</div>
          </div>
          <div className={"tile__right"}>{header.right}</div>
        </div>
      )}
      {children}
    </div>
  );
};

Tile.propTypes = {
  tileClass: PropTypes.string,
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
  header: PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string,
    right: PropTypes.node,
  }),
  children: PropTypes.any,
};

Tile.defaultProps = {
  tileSize: {
    sm: "sm-12",
    md: "md-12",
    lg: "lg-12",
    xl: "xl-12",
  },
};

export default Tile;
