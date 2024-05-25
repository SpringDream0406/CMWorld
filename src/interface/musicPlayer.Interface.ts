import { Dispatch, RefObject, SetStateAction } from "react";
import { IMusicData } from "./music.interface";
import ReactPlayer from "react-player";

export interface IMPlaylist {
  playlistRef: RefObject<HTMLDivElement>;
  seletedPlaylist: string | null;
  setSeletedPlaylist: Dispatch<SetStateAction<string | null>>;
  setShowPlaylist: Dispatch<SetStateAction<boolean>>;
}

export interface IMPlayingList {
  playingListRef: RefObject<HTMLDivElement>;
  realPlaylist: IMusicData[];
  setCurrentVideoIndex: Dispatch<SetStateAction<number>>;
  setShowPlayingList: Dispatch<SetStateAction<boolean>>;
  currentVideoIndex: number;
  isMobile: boolean;
}

export interface IMPlayerBar {
  played: number;
  setPlayed: Dispatch<SetStateAction<number>>;
  playerRef: RefObject<ReactPlayer>;
}
