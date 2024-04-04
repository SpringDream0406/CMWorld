import { Utils } from "./utils";

export class PlayerUtils {
  constructor(playlist, currentVideoIndex, setCurrentVideoIndex) {
    this.playlist = playlist;
    this.currentVideoIndex = currentVideoIndex;
    this.setCurrentVideoIndex = setCurrentVideoIndex;
  }

  makeSongInfo() {
    if (this.playlist.length > 0 && !Utils.isEmptyObject(this.playlist)) {
      const title = this.playlist[this.currentVideoIndex].title;
      const artist = this.playlist[this.currentVideoIndex].artist;
      return `${title} - ${artist}`;
    }
  }

  async duration(playerControl, setTotalTime, setPlayingTime) {
    const duration = await playerControl.getDuration();
    const currentTime = await playerControl.getCurrentTime();
    setTotalTime(Utils.formatTime(duration));
    setPlayingTime(Utils.formatTime(currentTime));
  }

  openVideo(setYouTubeVideSize, setIsVideoOpen, isVideoOpen) {
    setYouTubeVideSize(isVideoOpen ? 120 : 0);
    setIsVideoOpen(!isVideoOpen);
  }

  getControl(playerRef) {
    return playerRef.current.internalPlayer;
  }

  setVolume(playerRef, volume) {
    this.getControl(playerRef)?.setVolume(volume);
  }

  playVideo(playerRef) {
    this.getControl(playerRef)?.playVideo();
  }

  pauseVideo(playerRef) {
    this.getControl(playerRef)?.pauseVideo();
  }

  changeVideoIndex(playerRef, change) {
    this.setCurrentVideoIndex(
      (prevIndex) =>
        (prevIndex + change + this.playlist.length) % this.playlist.length
    );
    if (this.playlist.length === 1) {
      this.playVideo(playerRef);
    }
  }
}
