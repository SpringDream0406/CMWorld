import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  FirebaseUtils,
  ProviderName,
  guestbookLeftAction,
  providers,
  writeUserNameToDB,
} from "../../utils/firebase";

const GuestbookLeft = () => {
  const dispatch = useDispatch();
  const firebaseUID = useSelector(
    (state: RootState) => state.firebase.firebaseUID
  );
  const firebaseUserName = useSelector(
    (state: RootState) => state.firebase.firebaseUserName
  );
  const firebaseUtils = useMemo(() => new FirebaseUtils(dispatch), [dispatch]);
  const [auth, setAuth] = useState<JSX.Element | JSX.Element[] | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // 인증 상태 체크 시작
    firebaseUtils.firebaseOnAuthStateChanged();

    // 로그인 방법들 버튼 => 상황에 따라 loginBtn or addName이라  useEffect 밖으로 가면 노란줄 뜸
    const loginBtn = (
      <>
        <div className="guestbookLeft-auth-info">
          <span>방명록에 글을 쓰기 위해서는 로그인을 하셔야합니다.</span>
          <span>
            현재 사용 가능한 로그인 방법은 Github와 Google 계정으로의 연동이
            있습니다.
          </span>
          <span>Google에서 지원하는 Firebase를 사용중입니다.</span>
          <span>
            아래 두 버튼 중 선호하시는 방식으로 로그인 하시기 바랍니다.
          </span>
        </div>
        <div className="guestbookLeft-auth-btnDiv">
          {Object.keys(providers).map((key) => (
            <button
              className="guestbookLeft-auth-btn"
              key={key}
              onClick={() => firebaseUtils.firebaseAuth(key as ProviderName)}
            >
              <img
                src={`/images/icons/${key}.png`}
                alt={key}
                // width={"50rem"}
                // height={"50rem"}
              />
            </button>
          ))}
        </div>
      </>
    );

    // users에 name이 없는 경우 input창 == 첫 인증인 경우 => 상황에 따라 loginBtn or addName이라  useEffect 밖으로 가면 노란줄 뜸
    const addName = (
      <>
        <div className="guestbookLeft-auth-input-info">
          <span>처음 방문하신 것 같습니다.</span>
          <span>방명록에 사용될 이름을 입력해주세요.</span>
          <span>
            현재 이름 변경 기능을 지원하지 않으니 실수 없도록 입력하시기
            바랍니다.
          </span>
          <input
            ref={inputRef}
            type="text"
            placeholder="이름을 입력해주세요."
          />
          <button
            onClick={() =>
              writeUserNameToDB(
                inputRef,
                firebaseUtils,
                firebaseUID,
                dispatch,
                setAuth
              )
            }
          >
            이름 등록하기
          </button>
          <span>
            만약 이름을 잘못 등록하셨다면, springdream0406@gmail.com 으로
            연락주시기 바랍니다.
          </span>
        </div>
      </>
    );

    const logOutBtn = (
      <button onClick={firebaseUtils.firebaseLogout}>Logout</button>
    );

    // 페이지 들어오면 UID 체크하고
    // 1. 없으면 login 버튼 보이기 => 인증 완료하면 redux의 firebaseUID 업데이트
    // 2. users에 name없으면 input창 보이기 => redux의 firebaseUserName에 written 넣어서 useEffect 다시 실행
    // 3. 다 통과하면 redux의 firebaseUserName 업데이트 => xxx님 환영합니다 보여줌.
    guestbookLeftAction(
      firebaseUID,
      setAuth,
      loginBtn,
      logOutBtn,
      firebaseUtils,
      addName,
      dispatch
    );
  }, [firebaseUID, firebaseUserName, dispatch, firebaseUtils]);

  // 최종 username 띄우기
  const welcomeName = (
    <div>
      <span>{firebaseUserName}</span> 님
    </div>
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
      <div className="guestbookLeft-auth">{auth}</div>
    </div>
  );
};

export default GuestbookLeft;
