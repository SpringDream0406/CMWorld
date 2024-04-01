import MainLeft from "../pages/main/MainLeft";
import MainRight from "../pages/main/MainRight";
import AboutLeft from "../pages/about/AboutLeft";
import AboutRight from "../pages/about/AboutRight";

export class navigationTags {
  tags = {
    main: { left: MainLeft, right: MainRight, name: "홈" },
    about: { left: AboutLeft, right: AboutRight, name: "프로필" },
    projesct: { left: AboutLeft, right: AboutRight, name: "프로젝트" },
    music: { left: AboutLeft, right: AboutRight, name: "쥬크박스" },
    fun: { left: AboutLeft, right: AboutRight, name: "놀이터" },
    picture: { left: AboutLeft, right: AboutRight, name: "사진첩" },
    guestBook: { left: AboutLeft, right: AboutRight, name: "방명록" },
    setting: { left: AboutLeft, right: AboutRight, name: "설정" },
  };

  getNavigationTagName = (navigationTagName) => {
    const selectedPage = this.tags[navigationTagName];
    return selectedPage;
  };
}
