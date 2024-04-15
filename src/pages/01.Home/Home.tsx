import "../../styles/Home.css";
import HomeRight from "./HomeRight";
import IntroLeftPage from "../../components/IntroLeftPage";
import HomeIntroduceData from "./HomeComponents/HomeIntroduceData";

const Home = () => {
  return (
    <>
      <div className="wrapper__left">
        <div className="main__left">
          <IntroLeftPage introduceData={<HomeIntroduceData />} />
        </div>
      </div>
      <div className="wrapper__right">
        <div className="main__right">
          <HomeRight />
        </div>
      </div>
    </>
  );
};

export default Home;
