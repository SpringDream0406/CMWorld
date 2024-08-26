import { IPlaygroundData } from "../interface/playground.interface";

// 놀이터 모달 설정
export const playgroundModalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  height: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflow: "auto",
};

// 뮤직 플레이어로 이동 > 오리진 주소 뽑고 뒤에 musicplayer 추가, aws에서 제대로 작동안함..
const currentURL = window.location.origin;
const musicplayerURL = `${currentURL}/musicplayer`;
// const musicplayerURL = "https://cmworld.netlify.app/musicplayer"; // aws 용

export const playgroundData: IPlaygroundData[] = [
  {
    title: "뮤직 플레이어",
    img: "musicplayer",
    ex: "CM월드의 BGM 기능만 편하게 사용하고 싶다면? CM월드 모바일 버전을 PC에서 즐기고 싶다면? CM월드의 뮤직플레이어를 이용해보세요.",
    url: `${musicplayerURL}`,
  },
  {
    title: "누나 뮤직",
    img: "noonaPlayer",
    ex: "코딩 알려주는 누나의 자바스크립트 팀 프로젝트 결과물로, 스포티파이 API를 활용해 만든 음악 검색 사이트입니다. (검색만 가능)",
    url: "https://noona-music.netlify.app/",
  },
  {
    title: "가짜 결제",
    img: "fake-pay",
    ex: "가짜로 카카오페이를 원하는 금액과 상품명으로 결제해보고, 결제 내용을 카카오톡 메시지로 받아보세요.",
    url: "https://fake-kakaopay.netlify.app/",
  },
  {
    title: "팜팜",
    img: "farmfarm",
    ex: `광주 인공지능사관학교 4기 App반의 1차 프로젝트, 에비앙(App이앙)조의 "도심 농부를 위한 텃밭 분양 플랫폼" 데모 사이트를 경험해보세요. (해당 사이트는 2025년 5월 16일까지만 이용 가능합니다.)`,
    url: "http://farmfarm-front.s3-website.ap-northeast-2.amazonaws.com/",
  },
];
