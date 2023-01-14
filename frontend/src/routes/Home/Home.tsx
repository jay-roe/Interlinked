import { HomeDiv, Title } from "./Home.styles";
import NavBar from "../../components/NavBar/NavBar";

const Home = () => {
  return (
      <HomeDiv>
        <NavBar></NavBar>
        <Title>Interlinked</Title>
        {/* Here goes the app's components */}
      </HomeDiv>
    );
}

export default Home;
