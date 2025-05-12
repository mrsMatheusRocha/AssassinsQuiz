import Button from "@/components/Button";
import db from "../../../public/db.json";

import QuizBackground from '@/components/QuizBackground';
import QuizContainer from '@/components/QuizContainer';
import QuizLogo from '@/components/QuizLogo';
import Widget from "@/components/Widget";
import React, { useState } from 'react';
import styled from "styled-components";
import AlternativesForm from "@/components/AlternativeForm";
import BackLinkArrow from "@/components/BackLinkArrow";

function ResultWidget({results}) {
  return (
    <Widget>
      <Widget.Header>
        Tela de Resultado:
      </Widget.Header>

      <Widget.Content>
        <p>
          Você acertou
          {' '}
          {results.filter((x) => x).length}
          {' '}
          perguntas
        </p>
        <ul>
          {results.map((result, index) => (
            <li key={`result__${result}`}>
              #
              {index + 1}
              {' '}
              Resultado:
              {result === true
                ? 'Acertou'
                : 'Errou'}
            </li>
          ))}
        </ul>
      </Widget.Content>
    </Widget>
  );
}

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

  @media (max-width: 768px) {
    .abstergo {
    top: 55%;
    left: 25%;
    }
  }

  @media (max-width: 480px) {
    .abstergo {
    top: 185px;
    left: 65px;
    }
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
  onSubmit,
  addResult
}) {
  const [selectedAlternative, setSelectedAlternative] = useState(undefined);
  const questionId = `question__${questionIndex}`;
  const [isQuestionSubmited, setIsQuestionSubmited] = React.useState(false);
  const isCorrect = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;
  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/"/>
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
        <AlternativesForm
          onSubmit={(e) => {
            e.preventDefault();
            setIsQuestionSubmited(true);
            setTimeout(() => {
              addResult(isCorrect);
              onSubmit();
              setIsQuestionSubmited(false)
              setSelectedAlternative(undefined);
            }, 3 * 1000);
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === alternativeIndex;
            return (
              <Widget.Topic
                as="label"
                key={alternativeId}
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmited && alternativeStatus}
              >
                <InputRadio
                  id={alternativeId}
                  type="radio"
                  onChange={() => setSelectedAlternative(alternativeIndex)}
                  name={questionId}
                />
                {alternative}
              </Widget.Topic>
            );
          })}
          <Button type="submit" disabled={!hasAlternativeSelected}>
            Confirmar
          </Button>
          {isQuestionSubmited && isCorrect && <p>Você acertou!</p>}
          {isQuestionSubmited && !isCorrect && <p>Você errou!</p>}
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

const InputRadio = styled.input`
  left: -999em;
  position: absolute;
`;

export default function QuizPage() {
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const [results, setResults] = React.useState([]);
  const totalQuestions = db.questions.length;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex]

  function addResult(result) {
    setResults([
      ...results,
      result,
    ]);
  }

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
        <QuizLogo 
          logo="/logo.png"
        />
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmitQuiz}
            addResult={addResult}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT && <ResultWidget results={results} />}
      </QuizContainer>
    </QuizBackground>
  );
}