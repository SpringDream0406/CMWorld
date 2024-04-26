import { Utils } from "../utils/utils";

// 설정 leftNavePage
export const settingtags = {
  musicplayer: "뮤직 플레이어",
  visit: "방명록",
};

// 뮤직 플레이어 세팅 기본값
const musicPlayerDefaultSetting = {
  "플레이리스트 저장": true,
  "음악 자동 추천": false,
};

// 로컬스토리지에 저장된 뮤직 플레이어 세팅값
const localStorageMusicPlayerSetting =
  Utils.getObjLocalData("musicPlayerSetting");

// 로컬값 있나 체크하고 뮤직세팅값 정함
export const initialMusicSetting =
  localStorageMusicPlayerSetting || musicPlayerDefaultSetting;

// 뮤직플레이어 세팅 아래쪽에 적어놓는 정보 내용
export const musicPlayerSwitchInfo = {
  title: "뮤직 플레이어",
  info: "localStorage에 저장됩니다. (음량과 랜덤재생 설정은 자동으로 localStorage에 저장됩니다.)",
};

// 뮤직플레이어 세팅 스위치에 있는 ?에 표시되는 내용
export const switchInfoSpanTitle = {
  "플레이리스트 저장":
    "마지막으로 재생한 플레이리스트가 저장됩니다. (한 곡일 경우 한 곡만 저장됩니다.)",
  "음악 자동 추천":
    "플레이리스트를 자동으로 설정합니다. (시간과 날씨에 따라 다른 플레이리스트로 자동 설정됩니다.)",
};
