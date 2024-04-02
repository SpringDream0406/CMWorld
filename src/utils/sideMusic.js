export class SideMusicUtils {
  static formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = String(Math.floor(seconds % 60)).padStart(2, "0");
    return `${minutes}:${remainingSeconds}`;
  }

  static playPreviousVideo(currentIndex, playlistLength, setCurrentVideoIndex) {
    // 플레이리스트의 이전 비디오로 이동합니다.
    setCurrentVideoIndex((prevIndex) =>
      prevIndex === 0 ? playlistLength - 1 : prevIndex - 1
    );
  }
}
