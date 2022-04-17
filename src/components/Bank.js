import React, { useState, useEffect } from "react";

function Bank() {
  const [account, setAccount] = useState({
    balance: parseInt(localStorage.getItem("balance")) || 0,
    amount: "",
  });

  const handleInput = (e) => {

    setAccount({
      balance: account.balance,
      amount: parseInt(e.target.value),
    });

  };

  const handleWithdrawal = () => {
    if (account.balance < account.amount || typeof account.amount === 'string') {
      return
    }
    setAccount({
      balance: account.balance - parseInt(account.amount),
      amount: "",
    });
  };
  const handleDeposit = () => {
    if (typeof account.amount === 'string') {
      return
    }
    setAccount({
      balance: account.balance + parseInt(account.amount),
      amount: "",
    });
  };
  const reset = () => {
    setAccount({
      balance: 0,
      amount: "",
    });
  }

  useEffect(() => {
    window.addEventListener("beforeunload", safeData);
    function safeData() {
      localStorage.setItem("balance", account.balance)
    }
    return () => window.removeEventListener("beforeunload", safeData);
  }, [account.balance]);

  return (
    <div>
      <h2>Check your current Balance</h2>
      <p>{account.balance || account.balance === 0 ? `Your current balance is ${account.balance}€` : 'Ooops, something went wrong'}</p>
      <div>

        <input
          required
          onChange={handleInput}
          type="text"
          name="amount"
          id="amount"
          placeholder="Enter Amount"
          pattern="[0-9]+"
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