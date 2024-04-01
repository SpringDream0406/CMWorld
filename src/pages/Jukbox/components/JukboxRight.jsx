import React, { useState } from "react";
import "../../../styles/Jukbox.css";
import { useDispatch, useSelector } from "react-redux";

const JukboxRight = () => {
  const dispatch = useDispatch();
  const musicData = useSelector((state) => state.musicData);
  const [checkedMusics, setCheckedMusics] = useState([]);

  const getCheckedMusics = (event, music) => {
    const { checked } = event.target;
    if (checked) {
      setCheckedMusics([...checkedMusics, music]);
    } else {
      setCheckedMusics(
        checkedMusics.filter((item) => item.videoId !== music.videoId)
      );
    }
  };

  const sendCheckedMusics = () => {
    dispatch({ type: "CHECKEDMUSICS", payload: checkedMusics });
  };

  const renderMusicData = (data) => {
    return (
      <div>
        {data.map((music, index) => (
          <div key={index}>
            <input
              type="checkbox"
              onChange={(event) => getCheckedMusics(event, music)}
            />
            <div>
              {index + 1} - {music.artist} - {music.title} - {music.time}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="jukboxRight">
      <div className="music__table">
        <div className="music-row-header">
          <input type="checkbox" />
          <div>번호</div>
          <div>곡명</div>
          <div>아티스트</div>
          <div>시간</div>
        </div>
        <div className="music-row">{renderMusicData(musicData)}</div>
      </div>
      <div className="control" onClick={sendCheckedMusics}>
        플레이리스트 보내기
      </div>
      <div className="pageNation">페이지네이션</div>
    </div>
  );
};

export default JukboxRight;
