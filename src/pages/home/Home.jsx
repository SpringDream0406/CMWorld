// Home.js
import { useParams } from "react-router-dom";
import NavigationBar from "../NavigationBar";
import MainLeft from "../main/MainLeft";
import MainRight from "../main/MainRight";
import AboutLeft from "../about/AboutLeft";
import AboutRight from "../about/AboutRight";

const Home = () => {
  return (
    <div className="background">
      <div className="outerBlue">
        <div className="whiteSolid">
          <div className="outerbox">
            <div className="wrapper">
              <div className="wrapper__left">
                <ContentLeft />
              </div>

              <div className="wrapper__right">
                <ContentRight />
              </div>
              <NavigationBar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContentLeft = () => {
  const { page } = useParams(); // left 주소에 대한 파라미터 가져오기
  // 주소에 따라 해당하는 내용을 조건부로 렌더링
  switch (page) {
    case "main":
      return <MainLeft />;
    case "about":
      return <AboutLeft />;
    default:
      return null;
  }
};

const ContentRight = () => {
  const { page } = useParams(); // right 주소에 대한 파라미터 가져오기
  // 주소에 따라 해당하는 내용을 조건부로 렌더링
  switch (page) {
    case "main":
      return <MainRight />;
    case "about":
      return <AboutRight />;
    default:
      return null;
  }
};

export default Home;
