import { useRef } from "react";
import "../styles/components.css";
import { Components } from "../utils/components";
import { homeOpenSiteData } from "../data/openSiteData";

const OpenSite = () => {
  const siteRef = useRef<HTMLSelectElement>(null);

  const openStie = () => {
    if (siteRef.current) {
      Components.openStie(siteRef.current.value);
    }
  };

  return (
    <div className="sites">
      <div>
        <span>{homeOpenSiteData.title}</span>
      </div>
      <div>
        <select ref={siteRef}>
          {homeOpenSiteData.selectOptions.map((options) => (
            <option key={options.value} value={options.value}>
              {options.name}
            </option>
          ))}
        </select>
        <button onClick={openStie}>열기</button>
      </div>
    </div>
  );
};

export default OpenSite;
