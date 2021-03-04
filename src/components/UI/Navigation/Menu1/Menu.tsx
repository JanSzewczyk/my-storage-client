import React from "react";

import "./Menu.scss";

interface MenuProps {
  visible?: boolean;
}

const Menu: React.FC<MenuProps> = ({ visible = true }) => {
  let menuClasses: string[] = ["menu1"];
  if (visible) menuClasses.push("menu1--visible");

  return (
    <div className={menuClasses.join(" ")}>
      <label>elowina jebać disa</label>
      <div className={"item"}>item 1</div>
      <hr />
      <div className={"item"}>item 2</div>
      <hr />
      <div className={"item selected"}>selected item</div>
    </div>
  );
};

export default Menu;
