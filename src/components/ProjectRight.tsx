import "../styles/Project.css";
import { useParams } from "react-router-dom";
import { projectData } from "../data/projectData";
import OpenSite from "./OpenSite";
import { Utils } from "../utils/utils";

const ProjectRight = () => {
  const { category } = useParams();
  const selectedCategory = category;

  const filteredProjectData = Utils.filterShowProjectData(
    selectedCategory,
    projectData
  );

  const renderProjectData = (
    <div>
      {filteredProjectData.map((project, index) => (
        <div className="project-items" key={index}>
          <div className="project-title">{project.title}</div>
          <div className="project-where">{project.where}</div>
          <div className="project-when">{project.when}</div>
          <div className="project-sub">{project.sub}</div>
          <div className="project-exp">
            {project.exp.map((exp) => (
              <li key={exp}>{exp}</li>
            ))}
          </div>
          <div className="project-site">
            <OpenSite openSiteData={project.site} />
          </div>
        </div>
      ))}
    </div>
  );

  // 본문
  return <div className="project-right">{renderProjectData}</div>;
};

export default ProjectRight;
