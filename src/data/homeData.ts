import { musicData } from "./musicData";
import { projectData } from "./projectData";

import NotFound from "../pages/NotFound";
import Notice0Welecome from "../pages/01.Home/HomeComponents/notices/Notice0Welecome";
import Notice1UpdateInfo from "../pages/01.Home/HomeComponents/notices/Notice1UpdateInfo";
import Notice2Guestbook from "../pages/01.Home/HomeComponents/notices/Notice2Guestbook";
import Notice3AboutMusic from "../pages/01.Home/HomeComponents/notices/Notice3AboutMusic";
import { playgroundData } from "./playgroundData";

// 공지사항 제목
export const noticeTitles = [
  { title: "뮤직플레이어에 관하여", path: 3, date: "2024-05-25" },
  { title: "데이터에 관하여", path: 2, date: "2024-05-24" },
  { title: "업데이트 정보", path: 1, date: "2024-08-26" },
  { title: "환영합니다", path: 0, date: "2024-05-24" },
];

// 페이지 요약 데이터
export const pageSummary = [
  { name: "공지사항", url: "#", num: noticeTitles.length },
  { name: "프로젝트:", url: "/project", num: projectData.length },
  { name: "쥬크박스:", url: "/jukbox", num: musicData.length },
  { name: "놀이터:", url: "/playground", num: playgroundData.length },
  // { name: "사진첩:", url: "#", num: "고민중.." },
  { name: "방명록:", url: "/guestbook", num: "로딩중.." }, // 해당 페이지에서 업데이트됨
];

// 공지사항 선택
export const selectNotice = (notice: string) => {
  const noticeIndex = Number(notice);

  if (noticeIndex >= noticeTitles.length || isNaN(noticeIndex)) return NotFound; // 공지 데이터가 아닌 home/주소일 경우
  const noticeComponents = [
    Notice0Welecome,
    Notice1UpdateInfo,
    Notice2Guestbook,
    Notice3AboutMusic,
  ];
  const NoticeComponent = noticeComponents[noticeIndex];
  return NoticeComponent;
};

// 업데이트 버전 정보
export const updateVersionData = [
  {
    title: "- 2.0.0",
    sub: [
      {
        version: "- 2.2.3",
        change: "놀이터에 누나 뮤직 추가, 플레이어 관련 이미지 경로 정리",
        date: "2024-08-26",
      },
      {
        version: "- 2.2.2",
        change: "AWS에서 Netlify로 변경",
        date: "2024-07-31",
      },
      {
        version: "- 2.2.1",
        change: "사이트 아이콘추가, 프로젝트 업데이트",
        date: "2024-06-16",
      },
      {
        version: "- 2.2.0",
        change: "정식 배포",
        date: "2024-06-07",
      },
    ],
  },
  {
    title: "- Beta",
    sub: [
      {
        version: "- 2.2.0",
        change: "놀이터 추가",
        date: "2024-05-28",
      },
      {
        version: "- 2.1.1",
        change: "뮤직 플레이어 작동 방식 변경",
        date: "2024-05-25",
      },
      {
        version: "- 2.1.0",
        change: "모바일 지원 (뮤직 플레이어만 사용하도록 함)",
        date: "2024-05-24",
      },
      {
        version: "- 2.0.0",
        change: "Beta 버전 배포",
        date: "2024-05-22",
      },
    ],
  },
];
