import { educationData } from "../../data/profileData";

const Education = () => {
  const certification = Object.entries(educationData).map(([key, value]) => {
    return (
      <div className="profile-edu-icons" key={key}>
        <div className="profile-edu-title">{key}</div>
        <div className="profile-edu-desc">{value.설명}</div>
        <div className="profile-edu-date">{value.기간}</div>
      </div>
    );
  });

  return (
    <>
      <div className="title">Education</div>
      <div className="profile-items">{certification}</div>
    </>
  );
};

export default Education;
