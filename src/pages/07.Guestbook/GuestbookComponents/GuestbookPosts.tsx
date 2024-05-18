// import { DocumentData } from "firebase/firestore";
// import { GuestbookController } from "../../../utils/controller/guestbook.controller";

// const GuestbookPosts = ({
//   postDatas,
//   guestbookController,
//   firebaseUID,
// }: {
//   postDatas: DocumentData;
//   guestbookController: GuestbookController;
//   firebaseUID: string;
// }) => {
//   return (
//     <>
//       {Object.entries(postDatas)
//         .reverse()
//         .map(([key, value]) => (
//           <div className="guestbook-items" key={key}>
//             <div className="guestbook-posts-top">
//               <div className="guestbook-posts-name">{value.data.name}</div>
//               <div className="guestbook-posts-date">
//                 {value.data.postedAt?.toDate().toLocaleString()}
//               </div>
//               <button
//                 className="guestbook-posts-deleteBtn"
//                 onClick={() =>
//                   guestbookController.deletedPosts(value, firebaseUID)
//                 }
//               >
//                 X
//               </button>
//             </div>
//             <div className="guestbook-posts-body">
//               <div className="posts-body-img">
//                 {
//                   <img
//                     src={`images/guestbook/${value.data.img}`}
//                     height={"100%"}
//                     width={"100%"}
//                     alt={value.data.img}
//                   />
//                 }
//               </div>
//               <div className="posts-body-message">{value.data.message}</div>
//             </div>
//             <div className="guestbook-posts-footer">
//               {value.data.Re && `ㄴ춘몽: ${value.data.Re}`}
//             </div>
//           </div>
//         ))}
//     </>
//   );
// };

// export default GuestbookPosts;
