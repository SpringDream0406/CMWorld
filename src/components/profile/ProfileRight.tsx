import "../../styles/Profile.css";
import Certification from "./Certification";
import Education from "./Education";
import Skills from "./Skills";
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
