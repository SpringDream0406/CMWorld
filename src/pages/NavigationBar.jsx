import React from "react";
import { NavLink } from "react-router-dom";

const NavigationBar = () => {
  return (
    <div className="navigation">
      <NavLink to="/main" className="navigation__item" activeClassName="">
        홈
      </NavLink>
      <NavLink to="/about" className="navigation__item" activeClassName="">
        프로필
      </NavLink>
      <NavLink to="/about" className="navigation__item" activeClassName="">
        프로젝트
      </NavLink>
      <NavLink to="/about" className="navigation__item" activeClassName="">
        사진첩
      </NavLink>
      <NavLink to="/about" className="navigation__item" activeClassName="">
        방명록
      </NavLink>
      <NavLink to="/about" className="navigation__item" activeClassName="">
        쥬크박스
      </NavLink>
      <NavLink to="/about" className="navigation__item" activeClassName="">
        설정
      </NavLink>
    </div>
  );
};

export default NavigationBar;
