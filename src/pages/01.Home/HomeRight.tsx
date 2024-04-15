import "../../styles/Home.notice.css";
import { useParams } from "react-router-dom";
import HomeRightTop from "./HomeComponents/HomeRightTop";
import { selectNotice } from "../../data/homeData";

const HomeRight = () => {
  const { notice } = useParams(); // 주소에서 공지 번호 가져옴
  const NoticeComponent = selectNotice(notice); // 공지 번호에 맞는 component 반환

  return (
    <div className="home-right">
      <div className="home-right-top">
        <HomeRightTop />
      </div>
      <div className="home-right-notice-detail">
        <NoticeComponent />
      </div>
    </div>
  );
};

export default HomeRight;
