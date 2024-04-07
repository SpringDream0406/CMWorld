import { IMusicData } from "../interface/music";

export class YoutubeControl {
  constructor(
    private setCurrentVideoIndex: any,
    private setYoutubeController: any
  ) {}

  play(controller: any) {
    if (controller) controller.playVideo();
  }
  pause(controller: any) {
    if (controller) controller.pauseVideo();
  }
  setVolume(controller: any, volume: number) {
    if (controller) controller.setVolume(volume);
  }

  changeVideoIndex(controller: any, playlist: IMusicData[], change: number) {
    this.setCurrentVideoIndex(
      (prevIndex: number) =>
        (prevIndex + change + playlist.length) % playlist.length
    );
    if (playlist.length === 1) {
      this.play(controller);
    }
  }
}
