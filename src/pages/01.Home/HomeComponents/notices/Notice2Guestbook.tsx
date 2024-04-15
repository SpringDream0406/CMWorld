const Notice2Guestbook = () => {
  return (
    <>
      <span>안녕하세요.</span>
      <br />
      <span>
        현재 춘몽월드는 방명록을 제외하면 데이터를 따로 저장하는 곳이 존재하지
        않습니다.
      </span>
      <span>
        (설정 관련된 건 개인 컴퓨터의 localStorage에 저장되며, 보안과 무관한
        데이터들만 저장하고 있습니다.)
      </span>
      <br />
      <span>
        방명록의 경우 Google에서 운영하는 firebase라는 서비스를 이용하고 있으며,
      </span>
      <span>
        firebase에서 지원하는 인증 방식을 통해 사용자를 인증하고 있습니다.
      </span>
      <br />
      <span>
        이로인해 제가 얻게 되는 데이터는 인증할 때 사용하신 수단(GitHub or
        Google)과 수단에 등록되어있는 E-Mail주소,
      </span>
      <span>
        firebase에서 인증 후 랜덤하게 생성된 유저ID인 UID, 인증 후 입력해주시는
        이름, 그리고 방명록에 적어주시는 데이터뿐입니다.
      </span>
      <br />
      <span>
        정리하자면 제가 얻게 되는 개인적인 정보는 E-Mail주소와 입력해주신 이름,
        그리고 방명록에 적어주시게 될 정보들뿐입니다.
      </span>
      <span>
        제 개인적인 판단으로 미루어볼 때 이는 크게 민감한 정보가 아니라고
        생각되며, 춘몽월드를 이용하시는 데 있어
      </span>
      <span>
        데이터나 보안과 관련하여 안심하시고 이용하시라고 알려 드리고 싶었습니다.
      </span>
      <br />
      <br />
      <span>
        추가로 현재 인증 방법인 Github와 Google의 E-Mail이 겹치면 Google로
        통합됩니다.
      </span>
      <span>
        이 때문에 똑같은 E-Mail로 Github와 Google의 인증 두 가지를 사용하시게
        되면 Github의 인증이 막히게 되니,
      </span>
      <span>이점 참고하시어 이용하시는 데 불편함이 없으시길 바랍니다.</span>
    </>
  );
};

export default Notice2Guestbook;
