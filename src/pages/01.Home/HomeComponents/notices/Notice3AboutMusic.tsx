const Notice3AboutMusic = () => {
  return (
    <>
      <div className="notice-musicplayer-div1">
        <div className="notice-musicplayer-div2">
          <span>안녕하세요. 춘몽입니다.</span>
          <br />
          <span>
            개인적으로 춘몽월드를 만들면서 모티브로 삼은 싸이월드의 가장 큰
            특징은 BGM이라고 생각합니다.
          </span>
          <span>
            현재 춘몽월드의 BGM 기능은 React-Player를 사용하여 구현되었으며, 그
            중 Youtube를 연동하고 있습니다.
          </span>
          <span>
            때문에 현재 오른쪽에서 슬라이드 되고 있는 곡 정보를 클릭해보시면
            아래로 유튜브 화면을 볼 수 있습니다.
          </span>
        </div>
        <div className="notice-musicplayer-imgdiv">
          <img
            src="/images/musicplayer.png"
            alt="musicplayer"
            width={"100rem"}
            height={"auto"}
          />
        </div>
      </div>
      <br />
      <span>
        여러번 테스트를 해보고 안전장치도 만들어두었지만, 혹시나 노래재생에
        이상이 있으시다면 새로고침을 해보시기 바랍니다.
      </span>
      <span>
        만약 그래도 이상이 있으면 왼쪽 아래에 있는 제 이메일로 연락해주시면
        빠르게 확인 후 조치를 취하도록 하겠습니다.
      </span>
      <br />
      <span>
        더불어 유튜브의 노래들을 가져오다 보니 원작 유튜브가 삭제되었거나 하는
        등의 유튜브 이슈가 있을 수 있습니다.
      </span>
      <span>
        이 부분도 이메일로 연락해주시면 빠르게 확인 후 조치를 취하도록
        하겠습니다.
      </span>
      <br />
      <span>
        플레이리스트, 음량, 마지막 노래 인덱스, 랜덤재생 여부가 자동으로
        localStorage에 저장되어 재방문하셨을 때, 랜덤 재생상태가 아니라면
        마지막에 들으셨던 곡부터 이어서 들으실 수 있습니다. 플레이리스트는
        카테고리(ex: Working)가 저장되기 때문에 한 곡만 재생하신 경우에는 재방문
        시, 마지막 선택하셨던 플레이리스트가 나옵니다.
      </span>
      <br />
      <span>
        노래는 취향에 맞는 노래를 발견할 때마다 지속해서 추가할 예정입니다.
      </span>
      <span>
        저의 취향에 맞는 노래들을 같이 들으면서 춘몽월드를 즐기셨으면
        좋겠습니다.
      </span>
      <br />
      <span>
        추가로 모바일은 뮤직플레이어만 사용할 수 있도록 했으며, 모바일만의
        UI/UX를 구현해 두었습니다.
      </span>
    </>
  );
};

export default Notice3AboutMusic;
