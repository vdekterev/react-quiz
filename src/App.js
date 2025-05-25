import Header from "./components/Header";
import Main from "./components/Main";
import {useEffect} from "react";

export default function App() {

    useEffect(() => {
        async function fetchQuestions() {
            const res = await fetch("http://localhost:8000/questions");
            const data = await res.json();
            console.log(data);
        }

        void fetchQuestions();
    }, []);

    return (
     <div className="app">
        <Header />
         <Main>
             <p>1/15</p>
             <p>Question?</p>
         </Main>
     </div>
    );
}