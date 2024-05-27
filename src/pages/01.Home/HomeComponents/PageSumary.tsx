import { Link } from "react-router-dom";
import { pageSummary } from "../../../data/homeData";
import { useEffect, useMemo, useState } from "react";
import { GuestbookController } from "../../../utils/controller/guestbook.controller";

const PageSumary = () => {
  const guestbookController = useMemo(() => new GuestbookController(), []);
  const [numOfPosts, setNumOfPosts] = useState<number>(0); // 방명록 게시물 수

  // firebase에서 방명록 게시물 수 가져오기
  useEffect(() => {
    const countPosts = async () => {
      const countPosts = await guestbookController.countPosts();
      if (countPosts) setNumOfPosts(Number(countPosts));
    };
    countPosts();
  }, [guestbookController]);

  // 페이지 요약 데이터 원본 손상없도록 새로 하나 만들고, 방명록 요약 데이터 업데이트
  const pageSumaryData = [...pageSummary];
  pageSumaryData[pageSumaryData.length - 1].num = numOfPosts || "로딩중..";

  // 본문
  return (
    <>
      {pageSumaryData.map((data) => (
        <div key={data.name}>
          <Link to={data.url} className="home-pageSummary-link">
            {data.name} <span>{data.num}</span>
          </Link>
        </div>
      ))}
    </>
  );
};

export default PageSumary;
