import LeftNavPage from "../components/LeftNavPage";
import ProjectRight from "../components/ProjectRight";
import { projectTags } from "../data/projectData";

const Project = () => {
  return (
    <>
      <div className="wrapper__left">
        <div className="main__left">
          <LeftNavPage tags={projectTags} url={"/project/"} />
        </div>
      </div>
      <div className="wrapper__right">
        <div className="main__right">
          <ProjectRight />
        </div>
      </div>
    </>
  );
};

export default Project;
