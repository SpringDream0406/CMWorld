import React from "react";
import { NavLink } from "react-router-dom";
import { navigationTags } from "../components/navigationTagName";

const NavigationBar = () => {
  const tagsInstance = new navigationTags();
  const { tags } = tagsInstance;
  const navigationBars = Object.entries(tags).map(([tagName, tagContent]) => (
    <NavLink
      key={tagName}
      to={`/${tagName}`}
      className={({ isActive }) =>
        "navigation__item" + (isActive ? " active" : "")
      }
    >
      {tagContent.name}
    </NavLink>
  ));

  return <div className="navigation">{navigationBars}</div>;
};

export default NavigationBar;
