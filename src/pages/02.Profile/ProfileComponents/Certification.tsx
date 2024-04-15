import { certificationData } from "../../../data/profileData";

const Certification = () => {
  const certification = Object.entries(certificationData).map(
    ([key, value]) => {
      return (
        <div className="profile-icons" key={key}>
          <img src={`/images/icons/${key}.png`} alt={key} />
          <div className="profile-icons-title">{key}</div>
          <div className="profile-icons-date">{value}</div>
        </div>
      );
    }
  );

  return (
    <>
      <div className="title">Certification</div>
      <div className="profile-items">{certification}</div>
    </>
  );
};

export default Certification;
