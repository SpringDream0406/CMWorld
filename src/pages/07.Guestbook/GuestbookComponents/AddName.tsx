import { useRef } from "react";
import { GuestbookController } from "../../../utils/controller/guestbook.controller";

const AddName = ({
  guestbookController,
  firebaseUID,
}: {
  guestbookController: GuestbookController;
  firebaseUID: string;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <div className="guestbookLeft-auth-input-info">
        <span>처음 방문하신 것 같습니다.</span>
        <span>방명록에 사용될 이름을 입력해주세요.</span>
        <span>
          현재 이름 변경 기능을 지원하지 않으니 실수 없도록 입력하시기 바랍니다.
        </span>
        <input ref={inputRef} type="text" placeholder="이름을 입력해주세요." />
        <button
          onClick={() =>
            guestbookController.writeUserNameToDB(inputRef, firebaseUID)
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
};

export default AddName;
