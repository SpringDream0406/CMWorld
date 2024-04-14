import { Dispatch } from "redux";
import { GuestbookController } from "./controller/guestbook.controller";
import { homeActions } from "../redux/homeReducer";

export const getPostDatasAndupdateHomePageNumber = async (
  guestbookController: GuestbookController,
  setPostDatas: any,
  dispatch: Dispatch
) => {
  const postDatasFromFirebase = await guestbookController.readPosts();
  setPostDatas(postDatasFromFirebase);
  dispatch(
    homeActions.setnumberOfGuestbookPosts(postDatasFromFirebase?.length)
  );
};
