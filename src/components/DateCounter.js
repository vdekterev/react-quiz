import { useReducer } from "react";

const initialState = { count: 0, step: 1 };

function reducer(state, action) {
    switch (action.type) {
        case "INCREMENT":
            return { ...state, count: state.count + state.step };
        case "DECREMENT":
            return { ...state, count: state.count - state.step }
        case "setCount":
            return { ...state, count: action.payload }
        case "setStep":
            return { ...state, step: action.payload }
        case "RESET":
            return initialState;
        default:
            console.error("Unknown action: ", action);
            return state;
    }
}

function DateCounter() {
    const [state, dispatch] = useReducer(reducer, initialState, undefined);
    const { count, step } = state;

    // This mutates the date object.
    const date = new Date("june 21 2027");
    date.setDate(date.getDate() + count);

    const dec = () => dispatch({type: 'DECREMENT'});

    const inc = () => dispatch({type: 'INCREMENT'});

    const defineCount = e => {
        dispatch({type: "setCount", payload: Number(e.target.value)})
    };

    const defineStep = e => {
        dispatch({type: "setStep", payload: Number(e.target.value)})
    };

    const reset = () => {
        dispatch({ type: "RESET" })
    };

    return (
        <div className="counter">
            <div>
                <input
                    type="range"
                    min="1"
                    max="10"
                    value={step}
                    onChange={defineStep}
                />
                <span>{step}</span>
            </div>

            <div>
                <button onClick={dec}>-</button>
                <input value={count} onChange={defineCount}/>
                <button onClick={inc}>+</button>
            </div>

            <p>{date.toDateString()}</p>

            <div>
                <button onClick={reset}>Reset</button>
            </div>
        </div>
    );
}

export default DateCounter;
