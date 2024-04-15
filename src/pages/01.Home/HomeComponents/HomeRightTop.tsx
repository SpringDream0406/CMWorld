import { Link } from "react-router-dom";
import PageSumary from "./PageSumary";
import { noticeTitles } from "../../../data/homeData";

const HomeRightTop = () => {
  return (
    <>
      <div className="home-right-notice">공지사항</div>
      <div className="home-right-content">
        <div className="home-right-notice-content">
          {Object.values(noticeTitles).map((values) => (
            <div className="notice-itme" key={values.path}>
              <div className="notice-item-title">
                <Link to={`${values.path}`}>{values.title}</Link>
              </div>
              <div className="notice-item-date">{values.date}</div>
            </div>
          ))}
        </div>
        <div className="home-right-pageSummary">
          <PageSumary />
        </div>
      </div>
    </>
  );
};

export default HomeRightTop;
