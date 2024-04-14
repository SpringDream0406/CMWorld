import { Modal, Box, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { guestbookFrofileImages, modalStyle } from "../../data/guestbookData";
import { GuestbookController } from "../../utils/controller/guestbook.controller";

const GuestbookWriteBox = ({
  guestbookController,
  firebaseUID,
  firebaseUserName,
}: {
  guestbookController: GuestbookController;
  firebaseUID: string;
  firebaseUserName: string;
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedImg, setSelectedImg] = useState<string>("basic.jpeg");
  const textAreaRef = useRef(null);

  return (
    <>
      <div className="guestbook-write-body">
        <div className="guestbook-write-img">
          <img
            src={`images/guestbook/${selectedImg}`}
            alt="basic"
            height={"100%"}
            width={"100%"}
            onClick={() => setIsModalOpen(!isModalOpen)}
          />
        </div>
        <div className="guestbook-write-message">
          <textarea maxLength={1000} ref={textAreaRef} />
        </div>
      </div>
      <div className="guestbook-write-btn">
        <button
          disabled={!firebaseUID || !firebaseUserName}
          onClick={() =>
            guestbookController.writePost({
              firebaseUID,
              firebaseUserName,
              selectedImg,
              textAreaRef,
              setSelectedImg,
            })
          }
        >
          작성하기
        </button>
      </div>

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            원하시는 방명록 프로필을 선택해보세요.
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {guestbookFrofileImages.map((image) => (
              <img
                src={`images/guestbook/${image}`}
                alt={image}
                className="gusetbook-modal-img"
                style={{ width: "6rem", height: "6rem" }}
                onClick={() => {
                  setSelectedImg(image);
                  setIsModalOpen(false);
                }}
              />
            ))}
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default GuestbookWriteBox;
