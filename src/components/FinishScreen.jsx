export default function FinishScreen({ points, maxPoints, highscore, onRestart }) {
    const percentage = Math.ceil(points / maxPoints * 100);
    return (
        <>
            <p className="result">
                You scored <strong>{points}</strong> out of {maxPoints} ({percentage}%)
            </p>
            <p className="highscore">
                (Highscore: {highscore} points)
            </p>
            <button className="btn" onClick={onRestart}>
                Restart quiz
            </button>
        </>
    )
}
