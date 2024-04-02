import { isEmptyObject } from "./isEmptyObject";

export class SideMusicUtils {
  formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = String(Math.floor(seconds % 60)).padStart(2, "0");
    return `${minutes}:${remainingSeconds}`;
  }

  makeSoingInfo(playlist, currentVideoIndex) {
    if (!isEmptyObject(playlist)) {
      const title = playlist[currentVideoIndex].title;
      const artist = playlist[currentVideoIndex].artist;
      return `${title} - ${artist}`;
    }
  }

  async duration(playerControl, setTotalTime, setPlayingTime) {
    const duration = await playerControl.getDuration();
    const currentTime = await playerControl.getCurrentTime();
    setTotalTime(this.formatTime(duration));
    setPlayingTime(this.formatTime(currentTime));
  }
}

export class PlayerControlBtn {
  openVideo = (setYouTubeVideSize, setIsVideoOpen, isVideoOpen) => {
    setYouTubeVideSize(isVideoOpen ? 120 : 0);
    setIsVideoOpen(!isVideoOpen);
  };

  changeVideoIndex(playlistLength, setCurrentVideoIndex, change) {
    setCurrentVideoIndex(
      (prevIndex) => (prevIndex + change + playlistLength) % playlistLength
    );
  }

  playPreviousVideo(playlistLength, setCurrentVideoIndex) {
    this.changeVideoIndex(playlistLength, setCurrentVideoIndex, -1);
  }

  playNextVideo(playlistLength, setCurrentVideoIndex) {
    this.changeVideoIndex(playlistLength, setCurrentVideoIndex, 1);
  }

  playVideo(playerControl) {
    playerControl.playVideo();
  }

  pauseVideo(playerControl) {
    playerControl.pauseVideo();
  }
}
