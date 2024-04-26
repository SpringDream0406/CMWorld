import { ITags } from "../interface/main.interface";
import { IProjectData } from "../interface/project.interface";

// 프로젝트 leftNavPage
export const projectTags: ITags = {
  team: "팀 프로젝트",
  personal: "개인 프로젝트",
  p2024: "2024",
  p2023: "2023",
};

// 프로젝트 데이터
export const projectData: IProjectData[] = [
  {
    title: "팜팜 서버 교체2",
    where: "개인 프로젝트",
    when: "2024.04 ~ 2024.04 (진행 중)",
    sub: "Express.js로 만들어진 서버를 Nest.js로 교체",
    exp: [
      "Nest.js를 공부하면서, Router로 구성되어있던 Express.js를 Nest.js로 변경했습니다.",
      "TypeORM을 사용하여 DB를 구현하고, 쿼리를 처리했습니다.",
      "인증용 Auth 테이블을 만드는 등 DB를 조금 더 세분화 했습니다.",
    ],
    site: {
      selectOptions: [
        {
          name: "팜팜 Github",
          url: "https://github.com/SpringDream0406/-GAI-project_Appian",
        },
        {
          name: "팜팜 데모 사이트",
          url: "#",
        },
        {
          name: "팜팜 ERD (Nest.js)",
          url: "https://www.erdcloud.com/d/qezCTMmk7pf4SE4TQ",
        },
      ],
    },
    category: ["personal", "p2024"],
  },
  {
    title: "Portfolio.v2",
    where: "개인 프로젝트",
    when: "2024.03 ~ 2024.04 (2주, Beta 완성)",
    sub: "싸이월드를 모티브로 포트폴리오 사이트 제작",
    exp: [
      "Portfolio.v1의 결과가 만족스럽지 않아 저의 취향을 반영한 포트폴리오를 다시 만들게 되었습니다.",
    ],
    site: {
      selectOptions: [
        {
          name: "Portfolio.v2 Github",
          url: "https://github.com/SpringDream0406/portfolio.v2",
        },
        {
          name: "개발일지 (tistory)",
          url: "https://springdream0406.tistory.com/category/Projects/Portfolio.v2",
        },
      ],
    },
    category: ["personal", "p2024"],
  },
  {
    title: "Noona-Music",
    where: "코딩알려주는누나 JS 그룹 스터디",
    when: "2024.02 ~ 2024.03 (1주)",
    sub: "음악 검색 사이트 제작",
    exp: [
      "협업 경험과 JS의 기초를 다지기 위해 스터디 그룹에 참여하여 팀프로젝트를 진행했습니다.",
      "당시 공부중이던 모듈화를 활용해서 코드의 재사용성을 줄이기 위해 노력했습니다.",
      "프로젝트 후, API KEY를 숨기기 위해 Express.js를 사용하여 간단한 중간 서버를 만들었습니다.",
    ],
    site: {
      selectOptions: [
        {
          name: "Noona-Music Github",
          url: "https://github.com/SpringDream0406/Noona-Music",
        },

        {
          name: "Noona-Music 데모 사이트",
          url: "https://noona-music.netlify.app/",
        },
        {
          name: "Noona-Music-Server Github",
          url: "https://github.com/SpringDream0406/Noona-Music-Server",
        },
      ],
    },
    category: ["team", "p2024"],
  },
  {
    title: "Portfolio.v1",
    where: "개인 프로젝트",
    when: "2023.12 ~ 2024.01 (1개월)",
    sub: "기본적인 포트폴리오 사이트 제작",
    exp: [
      "광주 인공지능사관학교를 수료한 후, 이를 기반으로 포트폴리오 사이트를 제작했습니다.",
      "프론트를 담당했던 적이 없었기 때문에, 교육 당시 동료 중 프론트 지망생에게 기본 양식을 받아 제작했습니다.",
    ],
    site: {
      selectOptions: [
        {
          name: "Portfolio.v1 Github",
          url: "https://github.com/SpringDream0406/portfolio",
        },
        {
          name: "Portfolio.v1 사이트",
          url: "https://springdream0406.github.io/portfolio/",
        },
      ],
    },
    category: ["personal", "p2023", "p2024"],
  },
  {
    title: "KEKEKE",
    where: "광주 인공지능사관학교",
    when: "2023.11 ~ 2023.12 (1개월)",
    sub: "AI 추천 드로잉 기술을 이용한 주문 케이크 플랫폼",
    exp: [
      "옆 팀이 서버 관련 어려움을 겪고 있어 도움 역할로 참여했습니다.",
      "Express 서버의 초기 설정, 구매자와 판매자의 회원가입과 로그인 관련 API, 케이크 둘러보기 페이지 API 구축을 담당했습니다.",
      "작업한 코드들에 주석을 달아 이후 담당자가 작업하는데 참고 할 수 있게 했습니다.",
    ],
    site: {
      selectOptions: [
        {
          name: "케케케 Github",
          url: "https://github.com/SpringDream0406/-GAI-kekeke",
        },
      ],
    },
    category: ["team", "p2023"],
  },
  {
    title: "Seb's Music",
    where: "광주 인공지능사관학교",
    when: "2023.11 ~ 2023.12 (1개월)",
    sub: "AI기반 음악 추천 스트리밍 서비스",
    exp: ["서버와 DB 역할로 참여했습니다."],
    site: {
      selectOptions: [
        {
          name: "Seb's Music Github",
          url: "https://github.com/SpringDream0406/-GAI-Appsolute",
        },
      ],
    },
    category: ["team", "p2023"],
  },
  {
    title: "팜팜 서버 교체",
    where: "개인 프로젝트",
    when: "2023.10 ~ 2023.11 (1개월)",
    sub: "Flask로 만들어진 서버를 Express.js로 교체",
    exp: [
      "py파일 한개로만 짰던 Flask 서버를 Node 수업에서 배운 Router를 활용하여 기능별로 분리했습니다.",
      "Express.js로 다시 짜면서 ChatGPT와 인터넷을 따라 만들었던 코드를 다시 이해해볼 수 있었습니다.",
    ],
    site: {
      selectOptions: [
        {
          name: "팜팜 Github",
          url: "https://github.com/SpringDream0406/-GAI-project_Appian",
        },
        {
          name: "팜팜 데모 사이트",
          url: "#",
        },
        {
          name: "팜팜 ERD (Express.js)",
          url: "https://www.erdcloud.com/d/4FpqQg6NLnfDBboQv",
        },
      ],
    },
    category: ["personal", "p2023"],
  },
  {
    title: "팜팜",
    where: "광주 인공지능사관학교",
    when: "2023.07 ~ 2023.08 (1개월)",
    sub: "도심농부를 위한 텃밭 분양 플랫폼",
    exp: [
      "서버와 DB를 배우지 않은 상태로, ChatGPT와 인터넷 검색을 활용하여 Flask서버와 Oracle DB를 구축하고 관리했습니다.",
      "KAMIS와 농업날씨365 사이트의 기간별 데이터를 활용하여 농산물 가격 예측 모델을 개발했습니다.",
    ],
    site: {
      selectOptions: [
        {
          name: "팜팜 Github",
          url: "https://github.com/SpringDream0406/-GAI-project_Appian",
        },
        {
          name: "팜팜 데모 사이트",
          url: "#",
        },
      ],
    },
    category: ["team", "p2023"],
  },
];
