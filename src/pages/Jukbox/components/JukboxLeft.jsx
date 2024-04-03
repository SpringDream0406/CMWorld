import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { playlists, musicData } from "../../../musicData";

const JukboxLeft = () => {
  const dispatch = useDispatch();
  const selectedMenu = useSelector((state) => state.selectedPlaylist);
  const menus = playlists;

  const filterShowData = (playlistName) => {
    dispatch({ type: "SELECTEDPLAYLIST", payload: playlistName });
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
        className={"playlistName"}
        style={{
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
