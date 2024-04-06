import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { playlists, musicData } from "../../data/musicData";
import { RootState } from "../../redux/store";
import { Utils } from "../../utils/utils";

const JukboxLeft = () => {
  const dispatch = useDispatch();
  const selectedPlaylist: string = useSelector(
    (state: RootState) => state.music.selectedPlaylist
  );

  // 처음 쥬크박스 들어왔을 때 음악  전체 보기 랜더링
  useEffect(() => {
    Utils.filterShowData(dispatch, selectedPlaylist, musicData);
  });

  // 플레이리스트 가져다 랜더링
  const playListRender = (playlists: string[]) => {
    return playlists.map((menu, index) => (
      <span
        key={index}
        onClick={() => Utils.filterShowData(dispatch, menu, musicData)}
        className={"playlistName"}
        style={{
          backgroundColor:
            selectedPlaylist === menu ? "lightblue" : "transparent",
        }}
      >
        {menu}
      </span>
    ));
  };

  // 본문
  return <div className="jukboxLeft">{playListRender(playlists)}</div>;
};

export default JukboxLeft;
