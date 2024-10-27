import { updateVersionData } from "../../../../data/homeData";

const Notice1UpdateInfo = () => {
  return (
    <>
      <span>안녕하세요.</span>
      <span>
        춘몽월드의 업데이트 계획과 업데이트 내용을 다루는 페이지입니다.
      </span>
      <br />
      <span>
        춘몽월드(Portfolio.v2)의 개발과정이 궁금하신 분은{" "}
        <a
          href="https://springdream0406.tistory.com/category/Projects/%08CMWorld"
          target="_blank"
          rel="noreferrer"
        >
          개발일지
        </a>{" "}
        페이지를 방문해보세요.
      </span>
      <span>
        배포 버전의 자세한 변경사항이 궁금하신 분은{" "}
        <a
          href="https://springdream0406.tistory.com/114"
          target="_black"
          rel="noreferrer"
        >
          Version Info
        </a>
        를 방문해보세요.
      </span>
      <br />
      {updateVersionData.map((item, index) => (
        <div className="update-version-item" key={index}>
          <div className="update-version-main">{item.title}</div>
          {item.sub.map((subitem, index) => (
            <div className="update-sub-items" key={index}>
              <div className="update-sub-version">{subitem.version}:</div>
              <div className="update-sub-change">{subitem.change}</div>
              <div className="update-sub-date">{subitem.date}</div>
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default Notice1UpdateInfo;
