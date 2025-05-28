import Header from "./components/Header";
import Main from "./components/Main";
import {useEffect, useMemo, useReducer} from "react";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Timer from "./components/Timer";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";

const reducer = (state, action) => {
    // ACTION TYPE: dataReceived | dataFailed
    // STATUS: loading | error | ready | active | finished,
    switch (action.type) {
        case 'dataReceived':
            return {
                ...state,
                questions: action.payload,
                status: 'ready'
            };
        case 'dataFailed':
            return {
                ...state,
                status: 'error'
            }
        case 'quizStarted':
            return {
                ...state,
                status: 'active'
            }
        case 'quizFinished':
            return {
                ...state,
                status: 'finished',
                highscore: Math.max(state.highscore, state.score),
            }
        case 'quizNextAnswer':
            const question = state.questions[state.questionIdx];
            const isCorrect = action.payload === question.correctOption;

            return {
                ...state,
                answer: action.payload,
                score: isCorrect ? state.score + question.points : state.score
            }
        case 'quizNextQuestion':
            return {
                ...state,
                questionIdx: state.questionIdx + 1,
                answer: null,
            }
        case 'quizRestart':
            return {
                ...initialState,
                status: 'ready',
                questions: state.questions,
                highscore: state.highscore,
            };
        default:
            console.error("Unknown action: ", action);
            return state;
    }
}

const initialState = {
    questions: [],
    status: 'loading',
    questionIdx: 0,
    answer: null,
    score: 0,
    highscore: 0,
}

export default function App() {
    const [state, dispatch] = useReducer(reducer, initialState, undefined);
    const {
        status,
        questions,
        questionIdx,
        answer,
        score,
        highscore
    } = state;

    const numQuestions = questions.length;

    const maxPoints = useMemo(() => (
        questions.reduce((acc, question) => acc + question.points, 0)
    ), [questions])

    useEffect(() => {
        fetch("http://localhost:8000/questions")
            .then(res => res.json())
            .then(data => dispatch({ type: 'dataReceived', payload: data }))
            .catch(() => dispatch({ type: 'dataFailed' }))
    }, []);

    function handleNextQuestion() {
        const type = questionIdx === numQuestions - 1 ? 'quizFinished' : 'quizNextQuestion';
        dispatch({ type: type })
    }

    const TIME_LIMIT_SEC = questions.length * 30;

    return (
     <div className="app">
        <Header />
         <Main>
             {status === 'loading' && <Loader/>}
             {status === 'error' && <Error/>}
             {status === 'ready' &&
                 <StartScreen
                     onStart={() => dispatch({type: 'quizStarted'})}
                     numQuestions={numQuestions}
                 />
             }
             {status === 'active' &&
                 <>
                     <Progress
                         idx={questionIdx}
                         numQuestions={numQuestions}
                         points={score}
                         maxPoints={maxPoints}
                         answer={answer}
                     />
                     <Question
                         q={questions[questionIdx]}
                         onAnswer={idx => dispatch({
                             type: 'quizNextAnswer',
                             payload: idx
                         })}
                         answer={answer}
                     />
                     <footer>
                         <Timer timeLimit={TIME_LIMIT_SEC} onFinish={() => dispatch({type: 'quizFinished'})}/>
                         <NextButton answer={answer} onClick={handleNextQuestion}>
                             {questionIdx === numQuestions - 1 ? 'Finish' : 'Next'}
                         </NextButton>
                     </footer>
                 </>
             }
             {status === 'finished' &&
                 <FinishScreen
                     points={score}
                     maxPoints={maxPoints}
                     highscore={highscore}
                     onRestart={() => dispatch({ type: 'quizRestart' })}
                 />
             }

         </Main>
     </div>
    );
}