import { useRef } from "react";
import "../styles/components.css";
import { Components } from "../utils/components";
import { OpenSiteData } from "../interface/components";

const OpenSite = ({ openSiteData }: { openSiteData: OpenSiteData }) => {
  const siteRef = useRef<HTMLSelectElement>(null);

  const openStie = () => {
    if (siteRef.current) {
      Components.openStie(siteRef.current.value);
    }
  };

  return (
    <div className="sites">
      <div>
        <span>{openSiteData.title}</span>
      </div>
      <div>
        <select ref={siteRef}>
          {openSiteData.selectOptions.map((options) => (
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
