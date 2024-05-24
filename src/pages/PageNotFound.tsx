import IntroLeftPage from "../components/IntroLeftPage";
import HomeIntroduceData from "./01.Home/HomeComponents/HomeIntroduceData";
import HomeRightTop from "./01.Home/HomeComponents/HomeRightTop";
import NotFound from "./NotFound";

const PageNotFound = () => {
  return (
    <>
      <div className="wrapper__left">
        <div className="main__left">
          <IntroLeftPage introduceData={<HomeIntroduceData />} />
        </div>
      </div>
      <div className="wrapper__right">
        <div className="main__right">
          <div className="home-right">
            <div className="home-right-top">
              <HomeRightTop />
            </div>
            <div className="home-right-notice-detail">
              <NotFound />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
