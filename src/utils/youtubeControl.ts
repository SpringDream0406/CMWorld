import { MusicData } from "../interface/music";

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

  changeVideoIndex(controller: any, playlist: MusicData[], change: number) {
    this.setYoutubeController(null); // 이전 연결 정보로 요청 넣어서 먹통될때가 있는것 같아서 추가함
    this.setCurrentVideoIndex(
      (prevIndex: number) =>
        (prevIndex + change + playlist.length) % playlist.length
    );
    if (playlist.length === 1) {
      this.play(controller);
    }
  }
}
