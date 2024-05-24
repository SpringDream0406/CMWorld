import React, { useEffect } from "react";
import { Utils } from "../../utils/utils";
import { IMPlayingList } from "../mInterface";

const MPlayingList = ({
  playingListRef,
  realPlaylist,
  setCurrentVideoIndex,
  setShowPlayingList,
  currentVideoIndex,
}: IMPlayingList) => {
  //
  // playingList 열렸을 때 현재 노래로 자동 스크롤
  useEffect(() => {
    if (playingListRef.current)
      playingListRef.current.children[currentVideoIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
  }, [currentVideoIndex, playingListRef]);
  return (
    <div className="m-show-playingList" ref={playingListRef}>
      {realPlaylist.map((music, index) => (
        <div
          key={index}
          className="m-showing-playingList"
          onClick={() => {
            setCurrentVideoIndex(index);
            setShowPlayingList(false);
          }}
        >
          <div
            className="m-playingList-title"
            style={index === currentVideoIndex ? { color: "pink" } : {}}
          >
            {Utils.ellipsisText(music.title, 24)}
          </div>
          <div
            className="m-playingList-artist"
            style={index === currentVideoIndex ? { color: "pink" } : {}}
          >
            {Utils.ellipsisText(music.artist, 24)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MPlayingList;
