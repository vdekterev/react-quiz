export default function Progress({ idx, numQuestions, points, maxPoints, answer }) {
    return (
        <header className="progress">
            <progress value={idx + Number(answer !== null)} max={numQuestions} />
            <p>Question <strong>{idx + 1}</strong> / {numQuestions}</p>
            <p><strong>{points}</strong> / {maxPoints}</p>
        </header>
    )
}
