import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { musicData } from "../musicData";

const JukboxLeft = () => {
  const dispatch = useDispatch();
  const selectedMenu = useSelector((state) => state.selectedPlaylist);
  const menus = ["음악 전체 보기", "싸이월드 플레이리스트", "CM 추천"];

  const filterShowData = (playlistName) => {
    dispatch({ type: "SELECTEDPLAYLIST", payload: playlistName }); // 선택된 메뉴를 업데이트
    if (playlistName === "음악 전체 보기") {
      dispatch({ type: "MUSICDATA", payload: musicData });
      return;
    }
    const filteredMusic = musicData.filter((music) =>
      music.playlists.includes(playlistName)
    );
    dispatch({ type: "MUSICDATA", payload: filteredMusic });
  };

  const menuRender = (menus) => {
    return menus.map((menu, index) => (
      <span
        key={index}
        onClick={() => filterShowData(menu)}
        style={{
          cursor: "pointer",
          backgroundColor: selectedMenu === menu ? "lightblue" : "transparent",
        }}
      >
        {menu}
      </span>
    ));
  };

  return <div className="jukboxLeft">{menuRender(menus)}</div>;
};

export default JukboxLeft;
