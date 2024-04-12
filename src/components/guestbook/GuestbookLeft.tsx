import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { firebaseAction } from "../../redux/firebaseReducer";
import { FirebaseUtils } from "../../utils/firebase";

const GuestbookLeft = () => {
  const dispatch = useDispatch();
  const firebaseUID = useSelector(
    (state: RootState) => state.firebase.firebaseUID
  );
  const firebaseUserName = useSelector(
    (state: RootState) => state.firebase.firebaseUserName
  );
  const firebaseUtils = useMemo(() => new FirebaseUtils(dispatch), [dispatch]);
  const [page, setPage] = useState<JSX.Element | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const loginBtn = (
    <div>
      <button onClick={() => firebaseUtils.firebaseAuth("Github")}>
        <img src="/images/icons/Github.png" alt="Github" />
      </button>
      <button onClick={() => firebaseUtils.firebaseAuth("Google")}>
        <img src="/images/icons/Google.png" alt="Google" />
      </button>
    </div>
  );

  const writeUserNameToDB = async () => {
    if (!inputRef.current) return;

    const inputValue = inputRef.current.value;
    await firebaseUtils.writeUserToDB(firebaseUID, inputValue);
    const userData = await firebaseUtils.readUserDataFromDB(firebaseUID);
    dispatch(firebaseAction.setUserName(userData?.name));
  };

  const addName = (
    <div>
      <input ref={inputRef} type="text" placeholder="이름을 입력해주세요." />
      <button onClick={writeUserNameToDB}>등록하기</button>
    </div>
  );

  const final = <div>{firebaseUserName}님 환영합니다.</div>;

  useEffect(() => {
    const checkUID = async () => {
      if (!firebaseUID) {
        setPage(loginBtn);
        return;
      }

      const userData = await firebaseUtils.readUserDataFromDB(firebaseUID);
      if (!userData) {
        setPage(addName);
        return;
      }

      dispatch(firebaseAction.setUserName(userData?.name));
      setPage(final);
    };
    checkUID();
  }, [firebaseUID, firebaseUserName]);

  return <div>{page}</div>;
};

export default GuestbookLeft;
