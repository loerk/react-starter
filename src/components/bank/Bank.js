import { useReducer, useEffect } from "react";

const initialState = {
  balance: 0,
  amount: 0
}

function accountReducer(state, action) {
  switch (action.type) {
    case "SET_AMOUNT":
      return {
        ...state,
        amount: action.payload,
      }
    case "HANDLE_WITHDRAWAL":
      return {
        amount: 0,
        balance: state.balance - state.amount
      }
    case "HANDLE_DEPOSIT":
      return {
        balance: state.balance + state.amount,
        amount: 0
      }
    case "SET_BALANCE":
      return {
        balance: action.payload,
        ...state
      }
    case "RESET":
      return {
        balance: 0,
        ...state
      }

    default:
      return state

  }
}

function Bank() {

  const [state, dispatch] = useReducer(accountReducer, initialState)


  useEffect(() => {
    localStorage.setItem("balance", state.balance)
  }, [state.balance])

  useEffect(() => {
    dispatch({ type: "SET_BALANCE", payload: Number(localStorage.getItem("balance")) })
  }, [])


  return (
    <div>
      <h2>Check your not very real current Balance</h2>
      <p>{state.balance || state.balance === 0 ? `Your not very real current balance is ${state.balance}€` : 'Ooops, something went wrong'}</p>
      <div>

        <input
          value={state.amount}
          onChange={(e) => dispatch({ type: "SET_AMOUNT", payload: parseInt(e.target.value) })}
          type="text"
        />
        <button id="deposit" onClick={() => dispatch({ type: "HANDLE_DEPOSIT" })}>Deposit</button>
        <button id="withdrawal" onClick={() => dispatch({ type: "HANDLE_WITHDRAWAL" })}>Withdrawal</button>
      </div>
      <div>
        <button onClick={() => dispatch({ type: "RESET" })}>
          Reset Account
        </button>
      </div>

    </div>
  );
}

export default Bank;