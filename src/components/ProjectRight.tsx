import "../styles/Project.css";
import { useParams } from "react-router-dom";

const ProjectRight = () => {
  const { category } = useParams();
  const selectedCategory = category || "team";
  console.log(selectedCategory);

  return (
    <div className="projectRight">
      <div>
        <div>프로젝트 명</div>
        <div>소속/기관</div>
        <div>기간 (개월수)</div>
        <div>프로젝트 설명</div>
        <div>동작링크</div>
        <div>깃링크</div>
      </div>
    </div>
  );
};

export default ProjectRight;
