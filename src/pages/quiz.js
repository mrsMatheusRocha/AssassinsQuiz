import Button from "@/components/Button";
import db from "../../public/db.json";

import QuizBackground from '@/components/QuizBackground';
import QuizContainer from '@/components/QuizContainer';
import QuizLogo from '@/components/QuizLogo';
import Widget from "@/components/Widget";
import React, { useState } from 'react';
import styled from "styled-components";

const Loading = styled.div`
  @keyframes fadeWhite {
    100% {
      color: ${({ theme }) => theme.colors.primary};
    }
  }


  @keyframes glitch {
    0% {
      clip: rect(10px, 9999px, 80px, 0);
    }
    5% {
      clip: rect(20px, 9999px, 60px, 0);
    }
    10% {
      clip: rect(40px, 9999px, 70px, 0);
    }
    15% {
      clip: rect(30px, 9999px, 40px, 0);
    }
    20% {
      clip: rect(50px, 9999px, 60px, 0);
    }
    100% {
      clip: rect(10px, 9999px, 80px, 0);
    }
  }

  @keyframes move1 {
    from {
      transform: translateX(-100vw);
    }
  }
  @keyframes move2 {
    from {
      transform: translateY(-1800%) translateX(300%);
    }
  }
  @keyframes move3 {
    from {
      transform: translateY(1800%) translateX(300%);
    }
  }

  @keyframes spin1 {
    0%, 90% {
      transform: rotateZ(120deg);
    }
    35%, 65% {
      transform: rotateZ(240deg);
    }
  }
  @keyframes spin2 {
    0%, 90% {
      transform: rotateZ(-120deg);
    }
    35%, 65% {
      transform: rotateZ(0deg);
    }
  }
  @keyframes spin3 {
    0%, 90% {
      transform: rotateZ(0deg);
    }
    35%, 65% {
      transform: rotateZ(120deg);
    }
  }

  .abstergo {
    position: absolute;
    top: 57%;
    left: 17%;
    transform: translate(-30%, -50%); 
    font-size: 0;
  }

  .abstergo__handler:before,
  .abstergo__handler-01:before,
  .abstergo__handler-02:before,
  .abstergo__handler-03:before {
    content: "";
    font-size: 1rem;
    background-color: transparent;
    padding: 0px 3.3rem;
    border-bottom: 2.8rem solid ${({ theme }) => theme.colors.primary};;
    border-left: 1.54rem solid transparent;
    border-right: 1.54rem solid transparent;
    display: inline-block;
    transform-origin: 50% 0%;
    filter: drop-shadow(0px 0px 2px ${({ theme }) => theme.colors.primary});
  }

  .abstergo__handler-01 {
    position: absolute;
    transform: translateX(22.5%) translateY(-110%);
    top: 0;
    left: 0;
    animation: move2 1.25s cubic-bezier(0.72, 0.12, 0.32, 1.0) 0s 1;
  }
  .abstergo__handler-01:before {
    transform: rotateZ(120deg);
    animation: spin1 2s ease-in-out 1.5s infinite backwards;
  }

  .abstergo__handler-02 {
    position: absolute;
    transform: translateX(40%) translateY(15%);
    top: 0;
    left: 0;
    animation: move3 1.25s cubic-bezier(0.72, 0.12, 0.32, 1.0) 0s 1;
  }
  .abstergo__handler-02:before {
    transform: rotateZ(-120deg);
    animation: spin2 2s ease-in-out 1.5s infinite backwards;
  }

  .abstergo__handler-03 {
    animation: move1 1.25s cubic-bezier(0.72, 0.12, 0.32, 1.0) 0s 1;
  }
  .abstergo__handler-03:before {
    animation: spin3 2s ease-in-out 1.5s infinite backwards;
  }
`;

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Loading...
      </Widget.Header>

      <Widget.Content 
        style={{ height: "300px" }}
      >
        <Loading>
          <div class="wrapper">
            <div class="abstergo">
              <div class="abstergo__wrapper abstergo__wrapper--move">
                <div class="abstergo__handler abstergo__handler-01">
                </div>
              </div>
              <div class="abstergo__wrapper abstergo__wrapper--move">
                <div class="abstergo__handler abstergo__handler-02">
                </div>
              </div>
              <div class="abstergo__wrapper abstergo__wrapper--move">
                <div class="abstergo__handler abstergo__handler-03">
                </div>
              </div>
            </div>
          </div>
        </Loading>
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  question,
  totalQuestions,
  questionIndex,
  onSubmit
}) {
  const questionId = `question__${questionIndex}`;
  return (
    <Widget>
      <Widget.Header>
        <h3>
          {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
        </h3>
      </Widget.Header>

      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
      <Widget.Content>
        <h2>
          {question.title}
        </h2>
        <p>
          {question.description}
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            return (
              <Widget.Topic
                as="label"
                htmlFor={alternativeId}
              >
                <input
                  id={alternativeId}
                  type="radio"
                  name={questionId}
                />
                {alternative}
              </Widget.Topic>
            );
          })}
          <Button type="submit">
            Confirmar
          </Button>
        </form>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function QuizPage() {
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const totalQuestions = db.questions.length;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex]

  React.useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 3000);
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmitQuiz}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT && <div>Você acertou X questões, parabéns!</div>}
      </QuizContainer>
    </QuizBackground>
  );
}