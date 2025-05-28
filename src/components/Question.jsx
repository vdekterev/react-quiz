import Options from "./Options";

export default function Question({ q, onAnswer, answer }) {
    const {
        question,
        options,
        correctOption,
        points,
        id
    } = q;

    return (
        <div>
            <h4>{question}</h4>
            <Options
                options={options}
                onAnswer={onAnswer}
                correctOption={correctOption}
                answer={answer}
            />
        </div>
    )
}
