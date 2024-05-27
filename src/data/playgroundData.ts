import { IPlaygroundData } from "../interface/playground.interface";

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

const currentURL = window.location.href;
const musicplayerURL = currentURL.replace("playground", "musicplayer");
const imgPath = (path: string) => `images/playground/${path}.png`;
export const playgroundData: IPlaygroundData[] = [
  {
    title: "뮤직 플레이어",
    img: imgPath("musicplayer"),
    ex: "CM월드의 BGM 기능만 편하게 사용하고 싶다면? CM월드 모바일 버전을 PC에서 즐기고 싶다면? CM월드의 뮤직플레이어를 이용해보세요.",
    url: `${musicplayerURL}`,
  },
  {
    title: "가짜 결제",
    img: imgPath("fake-pay"),
    ex: "가짜로 카카오페이를 원하는 금액과 상품명으로 결제해보고, 결제 내용을 카카오톡 메시지로 받아보세요.",
    url: "https://fake-kakaopay.netlify.app/",
  },
  {
    title: "팜팜",
    img: imgPath("farmfarm"),
    ex: "광주 인공지능사관학교 4기 App반의 1차 프로젝트, 에비앙(App이앙) 조의 도심 농부를 위한 텃밭 분양 플랫폼의 데모 사이트를 경험해보세요. (해당 사이트는 2025년 5월 13일까지만 이용 가능합니다.)",
    url: "http://farmfarm-front.s3-website.ap-northeast-2.amazonaws.com/",
  },
];
