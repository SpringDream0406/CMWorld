// skills => public에 아이콘들도 추가 해줘야함
export const skillsData: string[] = [
  "HTML",
  "CSS",
  "JS",
  "React.js",
  "Node.js",
  "Express.js",
  "Nest.js",
  "Python",
  "MySQL",
  "ORACLE",
  "Firebase",
  "Github",
];

//certification
export const certificationData: { [key: string]: string } = {
  "AI-900": "2023-11",
  SQLD: "2023-10",
};

// education
export const educationData: {
  [key: string]: {
    [key: string]: string;
  };
} = {
  "광주 인공지능사관학교": { 기간: "2023.03 ~ 2023.12", 설명: "4기 / App반" },
  조선대학교: { 기간: "2007.03 ~ 2013.02", 설명: "전자공학과 4.09/4.5" },
};
