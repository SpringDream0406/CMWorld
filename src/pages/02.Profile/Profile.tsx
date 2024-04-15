import IntroduceData from "./ProfileComponents/ProfileIntroduceData";
import IntroLeftPage from "../../components/IntroLeftPage";
import ProfileRight from "./ProfileRight";

const Profile = () => {
  // 본문
  return (
    <>
      <div className="wrapper__left">
        <div className="main__left">
          <IntroLeftPage introduceData={<IntroduceData />} />
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
