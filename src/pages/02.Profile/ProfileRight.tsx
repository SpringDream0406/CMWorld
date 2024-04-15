import "../../styles/Profile.css";
import Certification from "./ProfileComponents/Certification";
import Education from "./ProfileComponents/Education";
import Skills from "./ProfileComponents/Skills";
const ProfileRight = () => {
  return (
    <div className="profileRight">
      <div className="profile-skills">
        <Skills />
      </div>
      <div className="profile-certification">
        <Certification />
      </div>
      <div className="profile-education">
        <Education />
      </div>
    </div>
  );
};

export default ProfileRight;
