import IntroLeftPage from "../../components/IntroLeftPage";
import ProfileRight from "./ProfileRight";

const Profile = () => {
  const introduceData: JSX.Element = (
    <>
      <span>안녕하세요.</span>
      <span>
        춘몽월드를 만든 <span>양춘모</span>입니다.
      </span>
      <br />
      <span>저는 현재 백엔드 개발자가 </span>
      <span>되기 위해 Node(Nest)를</span>
      <span>공부중입니다.</span>
      <br />
      <span>다시한번 춘몽월드에 오신걸</span>
      <span>환영하며, 즐거운 시간 보내시길 바랍니다.</span>
      <br />
      <span>여유가 되신다면 방명록에 </span>
      <span>글 남겨주세요~</span>
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
          <ProfileRight />
        </div>
      </div>
    </>
  );
};

export default Profile;
