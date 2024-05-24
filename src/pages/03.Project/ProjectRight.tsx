import "../../styles/Project.css";
import { useParams } from "react-router-dom";
import { projectData, projectTags } from "../../data/projectData";
import OpenSite from "../../components/OpenSite";
import { Utils } from "../../utils/utils";
import NotFound from "../NotFound";

const ProjectRight = () => {
  const { category = "team" } = useParams();
  const checkUrl = Utils.urlCheck(category, projectTags);

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
  return (
    <div className="project-right">
      {checkUrl ? renderProjectData : <NotFound />}
    </div>
  );
};

export default ProjectRight;
