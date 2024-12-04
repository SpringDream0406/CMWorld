import { Dispatch, SetStateAction } from "react";
import { IMusicData } from "../interface/music.interface";

export class PlayerUtils {
  constructor(
    private realPlaylist: IMusicData[],
    private currentVideoIndex: number,
    private setCurrentVideoIndex: any
  ) {}

  makeSongInfo(): string {
    const title = this.realPlaylist[this.currentVideoIndex].title;
    const artist = this.realPlaylist[this.currentVideoIndex].artist;
    return `${title} - ${artist}` || "";
  }

  openVideo(
    setYouTubeVideSize: any,
    setIsVideoOpen: any,
    isVideoOpen: boolean
  ) {
    setYouTubeVideSize(isVideoOpen ? 120 : 0);
    setIsVideoOpen(!isVideoOpen);
  }

  changeVideoIndex(change: number) {
    this.setCurrentVideoIndex(
      (prevIndex: number) =>
        (prevIndex + change + this.realPlaylist.length) %
        this.realPlaylist.length
    );
  }

  handlePlayerWithKeyDown(
    e: KeyboardEvent,
    setIsPlaying: Dispatch<SetStateAction<number>>,
    setIsShuffleOn: Dispatch<SetStateAction<boolean>>
  ) {
    switch (e.key) {
      case ",": // 이전곡
        this.changeVideoIndex(-1);
        break;
      case ".": // 다음곡
        this.changeVideoIndex(1);
        break;
      case " ": // 재생/정지
        setIsPlaying((pre) => (pre === 0 ? 1 : 0));
        break;
      case "s":
        setIsShuffleOn((p) => !p);
        break;
      default:
        break;
    }
  }
}
