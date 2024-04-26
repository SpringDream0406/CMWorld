import { musicData } from "./musicData";
import { projectData } from "./projectData";

import NotFound from "../pages/NotFound";
import Notice0Welecome from "../pages/01.Home/HomeComponents/notices/Notice0Welecome";
import Notice1UpdateInfo from "../pages/01.Home/HomeComponents/notices/Notice1UpdateInfo";
import Notice2Guestbook from "../pages/01.Home/HomeComponents/notices/Notice2Guestbook";
import Notice3AboutMusic from "../pages/01.Home/HomeComponents/notices/Notice3AboutMusic";

// 공지사항 제목
export const noticeTitles = [
  { title: "뮤직플레이어에 관하여", path: 3, date: "2024-04-26" },
  { title: "방명록과 데이터 보안에 관하여", path: 2, date: "2024-04-15" },
  { title: "업데이트 정보", path: 1, date: "2024-04-15" },
  { title: "환영합니다", path: 0, date: "2024-04-15" },
];

// 페이지 요약 데이터
export const pageSummary = [
  { name: "공지사항", url: "/#", num: noticeTitles.length },
  { name: "프로젝트:", url: "/project", num: projectData.length },
  { name: "쥬크박스:", url: "/jukbox", num: musicData.length },
  { name: "놀이터:", url: "/playground", num: "공사중.." },
  { name: "사진첩:", url: "/photo", num: "공사중.." },
  { name: "방명록:", url: "/guestbook", num: "로딩중.." }, // 해당 페이지에서 업데이트됨
];

// 공지사항 선택
export const selectNotice = (notice: string | undefined) => {
  const noticeIndex = parseInt(notice || "0");
  if (noticeIndex >= noticeTitles.length) return NotFound; // 공지 데이터가 아닌 home/주소일 경우
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
        version: "- 2.0.0 Beta",
        change: "Beta 버전 배포",
        date: "2024-04-00",
      },
    ],
  },
];
