import { GuestbookController } from "./controller/guestbook.controller";

export const getPostDatas = async (
  guestbookController: GuestbookController,
  setPostDatas: any
) => {
  const postDatasFromFirebase = await guestbookController.readPosts();
  setPostDatas(postDatasFromFirebase);
};
