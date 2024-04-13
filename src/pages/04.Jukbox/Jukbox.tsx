import JukboxRight from "./JukboxRight";
import LeftNavPage from "../../components/LeftNavPage";
import { playlists } from "../../data/musicData";

const Jukbox = () => {
  return (
    <>
      <div className="wrapper__left">
        <div className="main__left">
          <LeftNavPage tags={playlists} url={"/jukbox/"} />
        </div>
      </div>
      <div className="wrapper__right">
        <div className="main__right">
          <JukboxRight />
        </div>
      </div>
    </>
  );
};

export default Jukbox;
