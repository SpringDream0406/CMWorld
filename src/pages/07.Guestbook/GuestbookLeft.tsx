import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { GuestbookController } from "../../utils/controller/guestbook.controller";
import LoginBtn from "./GuestbookComponents/LoginBtn";
import AddName from "./GuestbookComponents/AddName";

const GuestbookLeft = () => {
  const dispatch = useDispatch();
  const firebaseUID = useSelector(
    (state: RootState) => state.firebase.firebaseUID
  );
  const firebaseUserName = useSelector(
    (state: RootState) => state.firebase.firebaseUserName
  );
  const guestbookController = useMemo(
    () => new GuestbookController(dispatch),
    [dispatch]
  );

  // 페이지 들어오면 UID 체크하고
  // 1. 없으면 login 버튼 보이기 => login하면 redux의 firebaseUID 업데이트
  // 2. users에 name없으면 input창 보이기 => name입력하면 redux의 firebaseUserName 업데이트

  useEffect(() => {
    // 유저 이름 설정
    if (firebaseUID && !firebaseUserName) {
      guestbookController.setUserName(firebaseUID);
    }
  }, [firebaseUID, guestbookController, firebaseUserName, dispatch]);

  // 최종적으로 뜨는 얘들
  const welcomeName = (
    <div>
      <span>{firebaseUserName}</span> 님
    </div>
  );
  const logOutBtn = (
    <button onClick={guestbookController.logOut}>Logout</button>
  );

  return (
    <div className="guestbookLeft">
      <div className="guestbookLeft-welcom">
        <div className="guestbookLeft-welcom-name">
          {firebaseUID && firebaseUserName && welcomeName}
        </div>
        <div className="guestbookLeft-welcom-message">
          방명록에 오신걸 환영합니다.
        </div>
      </div>
      <div className="guestbookLeft-auth">
        {!firebaseUID && <LoginBtn guestbookController={guestbookController} />}
        {firebaseUID && !firebaseUserName && (
          <AddName
            guestbookController={guestbookController}
            firebaseUID={firebaseUID}
          />
        )}
        {firebaseUID && firebaseUserName && logOutBtn}
      </div>
    </div>
  );
};

export default GuestbookLeft;
