import { Link } from "react-router-dom";
import { pageSummary } from "../../../data/homeData";
import { useEffect, useMemo, useState } from "react";
import { GuestbookController } from "../../../utils/controller/guestbook.controller";

const PageSumary = () => {
  const guestbookController = useMemo(() => new GuestbookController(), []);
  const [numOfPosts, setNumOfPosts] = useState<string | number>(0);

  useEffect(() => {
    const countPosts = async () => {
      const countPosts = await guestbookController.countPosts();
      if (countPosts) setNumOfPosts(countPosts);
    };
    countPosts();
  }, [guestbookController]);

  const pageSumaryData = [...pageSummary];
  pageSumaryData[4].num = numOfPosts || "로딩중..";

  return (
    <>
      {pageSumaryData.map((data) => (
        <div>
          <Link to={data.url} className="home-pageSummary-link" key={data.name}>
            {data.name} <span>{data.num}</span>
          </Link>
        </div>
      ))}
    </>
  );
};

export default PageSumary;
