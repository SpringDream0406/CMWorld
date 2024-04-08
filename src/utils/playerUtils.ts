import { IMusicData } from "../interface/music";

export class PlayerUtils {
  constructor(
    private realPlaylist: IMusicData[],
    private currentVideoIndex: number,
    private setCurrentVideoIndex: any
  ) {}

  makeSongInfo(): string {
    const title = this.realPlaylist[this.currentVideoIndex].title;
    const artist = this.realPlaylist[this.currentVideoIndex].artist;
    return `${title} - ${artist}`;
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
}
