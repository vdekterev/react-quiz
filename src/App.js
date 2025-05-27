import Header from "./components/Header";
import Main from "./components/Main";
import { useEffect, useReducer } from "react";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Timer from "./components/Timer";

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
        case 'dataStarted':
            return {
                ...state,
                status: 'active'
            }
        case 'dataFinished':
            return {
                ...state,
                status: 'finished'
            }
        case 'dataFailed':
            return {
                ...state,
                status: 'error'
            }
        default:
            console.error("Unknown action: ", action);
            return state;
    }
}

const initialState = {
    questions: [],
    status: 'loading'
}

export default function App() {
    const [state, dispatch] = useReducer(reducer, initialState, undefined);

    const { status, questions } = state;

    const numQuestions = questions.length;

    useEffect(() => {
        fetch("http://localhost:8000/questions")
            .then(res => res.json())
            .then(data => dispatch({ type: 'dataReceived', payload: data }))
            .catch(() => dispatch({ type: 'dataFailed' }))
    }, []);

    return (
     <div className="app">
        <Header />
         <Main>
             {status === 'loading' && <Loader/>}
             {status === 'error' && <Error/>}
             {status === 'ready' && <StartScreen onStartQuiz={() => dispatch({type: 'dataStarted'})} numQuestions={numQuestions}/>}
             {status === 'active' && (
                 <>
                    <h2>Question!!!</h2>
                    <Timer timeLimit={10} onFinish={() => dispatch({type: 'dataFinished'})}/>
                 </>
             )}
             {status === 'finished' && <h1>Finished!</h1>}

         </Main>
     </div>
    );
}