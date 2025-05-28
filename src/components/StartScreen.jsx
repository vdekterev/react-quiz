export default function StartScreen({ numQuestions, onStart }) {
    return (
        <div className="start">
            <h2>Welcome to the React Quiz!</h2>
            <h3>{numQuestions} questions to test your React mastery</h3>
            <button className="btn btn-ui" onClick={onStart}>Lets Go</button>
        </div>
    );
}