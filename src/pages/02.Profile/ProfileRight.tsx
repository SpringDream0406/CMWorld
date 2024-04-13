import "../../styles/Profile.css";
import Certification from "../../components/profile/Certification";
import Education from "../../components/profile/Education";
import Skills from "../../components/profile/Skills";
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
