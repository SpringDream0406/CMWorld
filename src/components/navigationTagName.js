import MainLeft from "../pages/main/MainLeft";
import MainRight from "../pages/main/MainRight";
import AboutLeft from "../pages/about/AboutLeft";
import AboutRight from "../pages/about/AboutRight";

export class navigationTags {
  tags = {
    main: { left: MainLeft, right: MainRight, name: "홈" },
    about: { left: AboutLeft, right: AboutRight, name: "프로필" },
  };

  getNavigationTagName = (navigationTagName) => {
    const selectedPage = this.tags[navigationTagName];
    return selectedPage;
  };
}
