import DemoComponent from "../../components/DemoComponent/DemoComponent";
import NavBar from "../../components/NavBar/NavBar";
import { DemoDiv } from "./Demo.styles";

const Home = () => {
  return (
      <DemoDiv>
        <NavBar></NavBar>
        <DemoComponent></DemoComponent>
      </DemoDiv>
    );
}

export default Home;