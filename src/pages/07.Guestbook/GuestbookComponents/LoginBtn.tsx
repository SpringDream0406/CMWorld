import { GuestbookController } from "../../../utils/controller/guestbook.controller";
import {
  ProviderName,
  providers,
} from "../../../utils/service/firebase.service";

const LoginBtn = ({
  guestbookController,
}: {
  guestbookController: GuestbookController;
}) => {
  return (
    <>
      <div className="guestbookLeft-auth-info">
        <span>방명록에 글을 쓰기 위해서는 로그인을 하셔야합니다.</span>
        <span>
          현재 사용 가능한 로그인 방법은 Github와 Google 계정으로의 연동이
          있습니다.
        </span>
        <span>Google에서 지원하는 Firebase를 사용중입니다.</span>
        <span>아래 두 버튼 중 선호하시는 방식으로 로그인 하시기 바랍니다.</span>
      </div>
      <div className="guestbookLeft-auth-btnDiv">
        {Object.keys(providers).map((providersName) => (
          <button
            className="guestbookLeft-auth-btn"
            key={providersName}
            onClick={() =>
              guestbookController.logIn(providersName as ProviderName)
            }
          >
            <img
              src={`/images/icons/${providersName}.png`}
              alt={providersName}
            />
          </button>
        ))}
      </div>
    </>
  );
};

export default LoginBtn;
