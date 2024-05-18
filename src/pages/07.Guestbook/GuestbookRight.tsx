// import { useEffect, useMemo, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { GuestbookController } from "../../utils/controller/guestbook.controller";
// import { DocumentData } from "firebase/firestore";
// import GuestbookPosts from "./GuestbookComponents/GuestbookPosts";
// import GuestbookWriteBox from "./GuestbookComponents/GuestbookWriteBox";
// import { RootState } from "../../redux/store";
// import { getPostDatas } from "../../utils/guestbook.utils";

// const GuestbookRight = () => {
//   const dispatch = useDispatch();
//   const firebaseUID = useSelector(
//     (state: RootState) => state.firebase.firebaseUID
//   );
//   const firebaseUserName = useSelector(
//     (state: RootState) => state.firebase.firebaseUserName
//   );
//   const [dataUpdated, setDataUpdated] = useState<Number>(1);

//   const guestbookController = useMemo(
//     () => new GuestbookController(dispatch, setDataUpdated),
//     [dispatch]
//   );
//   const [postDatas, setPostDatas] = useState<DocumentData | null>(null);

//   // 게시판 데이터 가져오고
//   useEffect(() => {
//     getPostDatas(guestbookController, setPostDatas);
//   }, [guestbookController, dataUpdated, dispatch]);

//   // 본문
//   return (
//     <div className="guestbookRight">
//       <div className="guestbook-write">
//         <GuestbookWriteBox
//           guestbookController={guestbookController}
//           firebaseUID={firebaseUID}
//           firebaseUserName={firebaseUserName}
//         />
//       </div>
//       <div className="guestbook-posts">
//         {postDatas && (
//           <GuestbookPosts
//             postDatas={postDatas}
//             guestbookController={guestbookController}
//             firebaseUID={firebaseUID}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default GuestbookRight;
