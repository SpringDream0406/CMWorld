import { IMusicData } from "../interface/music";
import { Utils } from "./utils";

export class PlayerUtils {
  constructor(
    private playlist: IMusicData[],
    private currentVideoIndex: number,
    private setCurrentVideoIndex: any
  ) {}

  makeSongInfo() {
    if (this.playlist.length > 0 && !Utils.isEmptyObject(this.playlist)) {
      const title = this.playlist[this.currentVideoIndex].title;
      const artist = this.playlist[this.currentVideoIndex].artist;
      return `${title} - ${artist}`;
    }
  }

  openVideo(
    setYouTubeVideSize: any,
    setIsVideoOpen: any,
    isVideoOpen: boolean
  ) {
    setYouTubeVideSize(isVideoOpen ? 120 : 0);
    setIsVideoOpen(!isVideoOpen);
  }
}
