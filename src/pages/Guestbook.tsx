import GuestbookRight from "../components/GuestbookRight";
import GuestbookLeft from "../components/guestbook/GuestbookLeft";
import "../styles/Guestbook.css";

const Guestbook = () => {
  return (
    <>
      <div className="wrapper__left">
        <div className="main__left">
          <GuestbookLeft />
        </div>
      </div>
      <div className="wrapper__right">
        <div className="main__right">
          <GuestbookRight />
        </div>
      </div>
    </>
  );
};

export default Guestbook;
