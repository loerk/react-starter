import { useState, useEffect } from "react";

function Bank() {
  const [balance, setBalance] = useState(parseInt(localStorage.getItem("balance")) || 0);
  const [amount, setAmount] = useState(0)


  const handleWithdrawal = () => {
    setBalance(balance - parseInt(amount));
  };

  const handleDeposit = () => {
    setBalance(balance + parseInt(amount));
  };
  const reset = () => {
    setBalance(0);
  }

  useEffect(() => {
    window.addEventListener("beforeunload", safeData);

    function safeData() {
      localStorage.setItem("balance", balance)
    }
    return () => window.removeEventListener("beforeunload", safeData);
  }, [balance]);

  return (
    <div>
      <h2>Check your not very real current Balance</h2>
      <p>{balance || balance === 0 ? `Your not very real current balance is ${balance}€` : 'Ooops, something went wrong'}</p>
      <div>

        <input
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter Amount"
          value={amount}
        />
      </div>
      <div>
        <button onClick={handleWithdrawal} id="widthdrawal">
          Withdrawal
        </button>
        <button onClick={handleDeposit} id="deposit">
          Deposit
        </button>
      </div>
      <div>
        <button onClick={reset} id="deposit">
          Reset Account
        </button>
      </div>

    </div>
  );
}

export default Bank;