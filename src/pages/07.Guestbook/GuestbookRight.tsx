import { useEffect, useState } from "react";
import { getPosts } from "../../utils/firebase";
import { IPostDatasFromFirebase } from "../../interface/firebase";

const GuestbookRight = () => {
  const [postDatas, setPostDatas] = useState<IPostDatasFromFirebase[]>();
  useEffect(() => {
    const getPostDatas = async () => {
      const postDatasFromFirebase = await getPosts();
      setPostDatas(postDatasFromFirebase);
    };
    getPostDatas();
  }, []);

  const renderGuestbookPosts =
    postDatas &&
    Object.entries(postDatas).map(([key, value]) => (
      <div className="guestbook-items" key={key}>
        <div className="guestbook-posts-top">
          <div className="guestbook-posts-name">{value.data.name}</div>
          <div className="guestbook-posts-date">
            {value.data.postedAt?.toDate().toLocaleString()}
          </div>
          <button className="guestbook-posts-deleteBtn">X</button>
        </div>
        <div className="guestbook-posts-body">
          <div className="posts-body-img">
            {
              <img
                src={`images/Guestbook/${value.data.img}`}
                height={"100rem"}
                width={"100rem"}
                alt={value.data.img}
              />
            }
          </div>
          <div className="posts-body-message">{value.data.message}</div>
        </div>
        <div className="guestbook-posts-footer">
          {value.data.Re && `ㄴ춘몽: ${value.data.Re}`}
        </div>
      </div>
    ));

  return (
    <div className="guestbookRight">
      <div className="guestbook-write">
        <div>사진</div>
        <div>내용</div>
        <div>버튼</div>
      </div>
      <div className="guestbook-posts">{renderGuestbookPosts}</div>
    </div>
  );
};

export default GuestbookRight;
