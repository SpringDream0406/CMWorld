import { Link } from "react-router-dom";

const Notice0Welecome = () => {
  return (
    <>
      <span>안녕하세요.</span>
      <span>CMWORLD의 춘몽입니다.</span>
      <br />
      <span>
        해당 사이트는 CYWORLD를 모티브로 하여 제작한 포트폴리오 사이트입니다.
      </span>
      <br />
      <span>
        위치정보를 이용하여 화면 오른쪽에 보이는 날씨 탭의 정보를 위치에 맞게
        업데이트하고, 배경움짤을 날씨에 맞게 변경하고 있으며,
      </span>
      <span>
        한국이 아닌 지역에 대한 접근을 차단하고 있으므로 위치정보를
        허용해주세요.
      </span>
      <span>추가적으로 자동추천플레이리스트 기능에도 사용되고 있습니다.</span>
      <br />
      <span>
        둘러보시기 전에 <Link to="/jukbox">쥬크박스</Link>에 방문하여 배경노래를
        먼저 세팅해보시거나
      </span>
      <span>
        <Link to="/setting/musicplayer">설정 페이지</Link>
        <span>에 방문하여 음악 자동 추천 기능을 on 시켜보세요.</span>
      </span>
      <br />
      <span>서로를 알아가는 좋은 시간이 되셨으면 좋겠습니다.</span>
      <br />
      <span>
        현재 페이지는 일반적인 27인치 4K모니터 사이즈 기준으로 제작
        되어있습니다. (완성 후 지원사이즈 추가 예정)
      </span>
    </>
  );
};

export default Notice0Welecome;
