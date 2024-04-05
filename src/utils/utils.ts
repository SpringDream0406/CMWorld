import React from "react";
import { MusicData } from "../interface/music";
import { NavigateFunction } from "react-router-dom";

export class Utils {
  static isEmptyObject(obj: Record<string, any>): boolean {
    return Object.keys(obj).length === 0;
  }

  static getSize(id: string): { width: number; height: number } {
    const element = document.getElementById(id);
    if (element) {
      const width = element.offsetWidth;
      const height = element.offsetHeight;
      return { width, height };
    } else return { width: 0, height: 0 };
  }

  static ellipsisText = (text: string, maxLength: number): string => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  static formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = String(Math.floor(seconds % 60)).padStart(2, "0");
    return `${minutes}:${remainingSeconds}`;
  }

  // 수정 필요
  static getControl(playerRef: React.RefObject<any>): any | undefined {
    if (playerRef && playerRef.current) {
      return playerRef.current.internalPlayer;
    }
  }

  static shufflePlaylist = (playlist: MusicData[]): MusicData[] => {
    const shuffledPlaylist = [...playlist];
    for (let i = shuffledPlaylist.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledPlaylist[i], shuffledPlaylist[j]] = [
        shuffledPlaylist[j],
        shuffledPlaylist[i],
      ];
    }
    return shuffledPlaylist;
  };

  static moveGeoPage = (navigate: NavigateFunction, inputCode: number) => {
    navigate("geolocation", { state: { code: inputCode } });
  };
}
