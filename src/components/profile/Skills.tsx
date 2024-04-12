import { skillsData } from "../../data/profileData";

const Skills = () => {
  const skills = skillsData.map((name) => {
    return (
      <div className="profile-icons" key={name}>
        <img src={`/images/icons/${name}.png`} alt={name} />
        <div className="profile-icons-title">{name}</div>
      </div>
    );
  });
  return (
    <>
      <div className="title">Skills</div>
      <div className="profile-items">{skills}</div>
    </>
  );
};

export default Skills;
