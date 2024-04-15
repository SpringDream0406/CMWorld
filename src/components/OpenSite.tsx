import { useRef } from "react";
import "../styles/Components.css";
import { Components } from "../utils/components";
import { IOpenSiteData } from "../interface/components.interface";

const OpenSite = ({ openSiteData }: { openSiteData: IOpenSiteData }) => {
  const siteRef = useRef<HTMLSelectElement>(null);

  const openStie = () => {
    if (siteRef.current) {
      Components.openStie(siteRef.current.value);
    }
  };

  return (
    <div className="sites">
      <div>
        <span>{openSiteData?.title}</span>
      </div>
      <div>
        <select ref={siteRef}>
          {openSiteData.selectOptions.map((options) => (
            <option key={options.name} value={options.url}>
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
