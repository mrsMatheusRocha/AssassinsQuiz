import styled from "styled-components";
import db from "../../public/db.json";

import Widget from "../components/Widget";
import QuizLogo from "../components/QuizLogo";
import QuizBackground from "../components/QuizBackground";
import Footer from "../components/Footer";
import GitHubCorner from "../components/GithubCorner";
import Head from "next/head";



export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default function Home() {
  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>Assassin's Quiz</title>
        <meta property="og:title" content="Assassin's Creed Quiz"/>
        <meta property="og:image" content="https://i.redd.it/1yingsop7u5b1.png" />
        <link rel="icon" href="/icon.ico" />
      </Head>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <h1>{db.title}</h1>
          </Widget.Header>
          <Widget.Content>
            <p>{db.description}</p>
          </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Content>
            <h1>Quizes da Galera</h1>

            <p>lorem ipsum dolor sit amet...</p>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/mrsMatheusRocha" />
    </QuizBackground>
  );
}
