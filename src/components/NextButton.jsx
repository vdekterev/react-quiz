export default function NextButton({ children, answer, onClick }) {
    if (answer === null) return null;
    return (
        <button
            className="btn btn-ui"
            onClick={onClick}
        >
            {children}
        </button>
    )
}
