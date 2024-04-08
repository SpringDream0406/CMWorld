import "../styles/Home.css";
import HomeRight from "../components/home/HomeRight";
import IntroLeftPage from "../components/IntroLeftPage";

const Home = () => {
  const introduceData: JSX.Element = (
    <>
      <span>춘몽월드(CMWORLD)에 </span>
      <span>오신걸 환영합니다.</span>
    </>
  );
  return (
    <>
      <div className="wrapper__left">
        <div className="main__left">
          <IntroLeftPage introduceData={introduceData} />
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
