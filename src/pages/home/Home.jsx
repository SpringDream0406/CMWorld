import { navigationTags } from "../../components/navigationTagName";
import { useParams } from "react-router-dom";

import NavigationBar from "../NavigationBar";
import NotFound from "../NotFound";

const Home = () => {
  const { navigationTagName } = useParams();
  const navigation = new navigationTags();
  const selectedPage = navigation.getNavigationTagName(navigationTagName);
  if (!selectedPage) {
    return <NotFound />;
  }

  return (
    <div className="background">
      <div className="outerBlue">
        <div className="whiteSolid">
          <div className="outerbox">
            <div className="wrapper">
              <div className="wrapper__left">
                <selectedPage.left />
              </div>
              <div className="wrapper__right">
                <selectedPage.right />
              </div>
              <NavigationBar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
