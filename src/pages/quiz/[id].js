import React from 'react';
import QuizScreen from '../../screens/Quiz'
import { ThemeProvider } from 'styled-components';

export default function QuizDaGaleraPage({ dbExterno}) {
  return (
    <ThemeProvider theme={dbExterno.theme}>
      <QuizScreen 
        externalQuestions={dbExterno.questions}
        externalBg={dbExterno.bg}
      />
    </ThemeProvider>
  )
}

export async function getServerSideProps(context) {
  const [projectName, githubUser] = context.query.id.split('___')
  const dbExterno = await fetch(`https://${projectName}.${githubUser}.vercel.app/api/db`)
    .then((resServer) => {
      if (resServer.ok) {
        return resServer.json();
      }
      throw new Error("Falha em pegar os dados")
    })
    .then((resConvertidaServer) => {
      return resConvertidaServer;
    })
    .catch((error) => {
      console.error(error);
    })
  return {
    props: {
      dbExterno,
    },

  }
};