import React, { useRef } from "react";

const SelectSite = () => {
  const siteRef = useRef(null);
  const goToSite = () => {
    const selectedSite = siteRef.current.value;
    // console.log(selectedSite);
    window.open(`https://${selectedSite}`, "_blank");
  };

  return (
    <div className="sites">
      관련 사이트
      <br />
      <select ref={siteRef}>
        <option value="github.com/springdream0406">GitHub</option>
        <option value="springdream0406.tistory.com">Blog</option>
        <option value="springdream0406.github.io/portfolio">
          포트폴리오.v1
        </option>
      </select>
      <button onClick={goToSite}>이동</button>
    </div>
  );
};

export default SelectSite;
