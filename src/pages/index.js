import db from "../../public/db.json";
import { useRouter } from "next/router";

import Widget from "../components/Widget";
import QuizLogo from "../components/QuizLogo";
import QuizBackground from "../components/QuizBackground";
import Footer from "../components/Footer";
import GitHubCorner from "../components/GithubCorner";
import Head from "next/head";
import { useState } from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import QuizContainer from "@/components/QuizContainer";

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState("");


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
            <form onSubmit={(e) => {
              e.preventDefault();
              router.push(`/quiz?name=${name}`)
            }}>
              <Input
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="Digite seu nome para jogar xD"/
              >
              <Button type="submit" disabled={name.length === 0}>
                {`Jogar ${name}`}
              </Button>
            </form>
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
