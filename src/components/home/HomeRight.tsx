import { useState } from "react";
import { Link } from "react-router-dom";

const HomeRight = () => {
  const me = <span></span>;
  const [visitMessage, setVisitMessage] = useState(first);

  return (
    <div className="home-right">
      <div className="home-right-top">
        <div className="home-right-notice">공지사항</div>
        <div className="home-right-content">
          <div className="home-right-notice-content">
            <div>공지 내용</div>
          </div>
          <div className="home-right-pageSummary">게시판 게시물 숫자 요약</div>
        </div>
      </div>
      <div className="home-right-notice-detail">
        <span>안녕하세요.</span>
        <span>CMWORLD의 춘몽입니다.</span>
        <br />
        <span>
          해당 사이트는 CYWORLD를 모티브로 하여 제작한 포트폴리오 사이트입니다.
        </span>
        <span>
          위치정보를 이용하여 화면 오른쪽에 보이는 날씨 탭의 정보를 위치에 맞게
          업데이트하고, 배경움짤을 날씨에 맞게 변경하고 있으며, 한국이 아닌
          지역에 대한 접근을 차단하고 있으므로 위치정보를 허용해주세요.
        </span>
        {/* <span>추가적으로 자동추천플레이리스트 기능에도 사용되고 있습니다.</span> */}
        <br />
        {first}
        <br />
        <span>서로를 알아가는 좋은 시간이 되셨으면 좋겠습니다.</span>
        <br />
        <span>
          현재 페이지는 일반적인 모니터 사이트 기준으로 제작 되어있습니다. (완성
          후 지원사이즈 추가 예정)
        </span>
      </div>
    </div>
  );
};

export default HomeRight;

const first = (
  <>
    <span>설정 저장이 안 되어 있는 걸로 보아 첫 방문 사용자로 보이십니다.</span>
    <span>
      <Link to="setting">설정 페이지</Link>
      <span>에 방문하여 사용 경험을 증가시키기 위한 세팅을 해보세요.</span>
    </span>
  </>
);
