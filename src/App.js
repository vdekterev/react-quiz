import "./index.css";
import {useEffect, useReducer} from "react";
import {useLocalStorage} from "./hooks/useLocalStorage";

const initialState = {
    balance: 0,
    loan: 0,
    isActive: false
};

function reducer(state, action) {
    if (!state.isActive && action.type !== 'openAccount') return state;

    const STARTER_BALANCE = 500;
    const LOAN_AMOUNT = 5000;

    switch (action.type) {
        /* Action types: openAccount, deposit, withdraw, requestLoan, payLoan, closeAccount */
        case 'openAccount':
            return {
                ...state,
                balance: STARTER_BALANCE,
                isActive: true
            }
        case 'deposit':
            return {
                ...state,
                balance: state.balance + action.payload,
            }
        case 'withdraw':
            return {
                ...state,
                balance: Math.max(state.balance - action.payload, 0)
            }
        case 'requestLoan':
            if (state.loan) return state;
            return {
                ...state,
                balance: state.balance + LOAN_AMOUNT,
                loan: LOAN_AMOUNT
            }
        case 'payLoan':
            if (!state.loan || state.balance <= 0) return state;

            return {
                ...state,
                balance: Math.max(state.balance - state.loan, 0),
                loan: Math.max(state.loan - state.balance, 0)
            }
        case 'closeAccount':
            if (state.balance || state.loan) return state;
            return {
                ...state,
                isActive: false
            }
        default:
            console.error('Unknown action: ' + action.type);
            return state;
    }
}

export default function App() {
    const [storedState] = useLocalStorage('game-state', initialState);

    const [state, dispatch] = useReducer(reducer, storedState, undefined);

    const {
        balance,
        loan,
        isActive
    } = state;

    useEffect(() => {
        localStorage.setItem('game-state', JSON.stringify(state));
    }, [state])

    return (
        <div className={`App ${!isActive && "inactive"}`}>
            <h1>useReducer Bank Account</h1>
            <p>Balance: {balance}</p>
            <p>Loan: {loan}</p>

            <p>
                <button className="open-account" onClick={() => dispatch({ type: 'openAccount' })} disabled={isActive}>
                    Open account
                </button>
            </p>
            <p>
                <button onClick={() => dispatch({ type: 'deposit', payload: 150 })} disabled={!isActive}>
                    Deposit 150
                </button>
            </p>
            <p>
                <button onClick={() => dispatch({ type: 'withdraw', payload: 50 })} disabled={!balance}>
                    Withdraw 50
                </button>
            </p>
            <p>
                <button onClick={() => dispatch({ type: 'requestLoan' })} disabled={!isActive || loan > 0}>
                    Request a loan of 5000
                </button>
            </p>
            <p>
                <button onClick={() => dispatch({ type: 'payLoan' })} disabled={!isActive || !balance || !loan}>
                    Pay loan
                </button>
            </p>
            <p>
                <button onClick={() => dispatch({ type: 'closeAccount' })} disabled={!isActive}>
                    Close account
                </button>
            </p>
        </div>
    );
}
