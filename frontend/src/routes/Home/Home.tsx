import { useAuth } from "../../contexts/AuthContext";
import { HeroDescription, HomeDiv, Title } from "./Home.styles";

const Home = () => {
  const { currentUser } = useAuth();

  return (
    <HomeDiv>
      <Title>Interlinked</Title>
      {/* Here goes the app's components */}
      {
        currentUser ? 
        <HeroDescription>Welcome, {currentUser.displayName ? currentUser.displayName : currentUser.email}. Let's get you interlinked.</HeroDescription>: 
        <HeroDescription>We will become interlinked.</HeroDescription>
      }
    </HomeDiv>
  );
}

export default Home;
