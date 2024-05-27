import { Box, Modal, Typography } from "@mui/material";
import {
  playgroundData,
  playgroundModalStyle,
} from "../../data/playgroundData";
import "../../styles/Playground.css";
import { useState } from "react";

const Playground = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // 모달 열고 닫기
  const [selectedItem, setSelectedItem] = useState<number>(0); // 모달에 띄울 선택된 아이템

  // 본문
  return (
    <div className="playground-wrap">
      <div className="playground">
        {playgroundData.map((playground, index) => (
          <div
            className="playground-items"
            key={index}
            onClick={() => {
              setIsModalOpen(!isModalOpen);
              setSelectedItem(index);
            }}
          >
            <div className="playground-items-title">{playground.title}</div>
            <div className="playground-items-img">
              <img
                src={`images/playground/${playground.img}.png`}
                alt={playground.img}
              />
            </div>
          </div>
        ))}
      </div>
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={playgroundModalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {playgroundData[selectedItem].title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {playgroundData[selectedItem].ex}
            <br />
            <br />
            <a
              onClick={() => setIsModalOpen(false)}
              href={playgroundData[selectedItem].url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {playgroundData[selectedItem].title} 사이트로 이동하기
            </a>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default Playground;
