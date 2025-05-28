export default function Options({ options, onAnswer, answer, correctOption }) {
    const hasAnswered = answer !== null;
    return (
        <div className="options">
            {options.map((option, idx) => (
                <button
                    className={
                        `btn btn-option 
                        ${idx === answer && 'answer'} 
                        ${hasAnswered && (idx === correctOption ? 'correct' : 'wrong') }`
                    }
                    key={option}
                    onClick={() => onAnswer(idx)}
                    disabled={hasAnswered}
                >
                    {option}
                </button>
            ))}
        </div>
    )
}
