import React, { useState, useEffect } from "react";

function Bank() {
  const [account, setAccount] = useState({
    balance: localStorage.getItem("balance") || 1000,
    amount: "",
  });

  const handleInput = (e) => {
    setAccount({
      balance: account.balance,
      amount: parseInt(e.target.value),
    });

  };

  const handleWithdrawal = () => {
    if (account.balance < account.amount) {
      return
    }
    setAccount({
      balance: account.balance - parseInt(account.amount),
      amount: "",
    });
  };
  const handleDeposit = () => {
    setAccount({
      balance: account.balance + parseInt(account.amount),
      amount: "",
    });
  };

  useEffect(() => {
    window.addEventListener("beforeunload", safeData);
    function safeData() {
      // localStorage.setItem("balance", account.balance)
    }
    return () => window.removeEventListener("beforeunload", safeData);
  }, [account.balance]);

  return (
    <div>
      <h2>Check your current Balance</h2>
      <p>Your current balance is {account.balance}€</p>
      <input
        onChange={handleInput}
        type="number"
        name="amount"
        id="amount"
        placeholder="Enter Amount"
        pattern="[0-9]+"
        value={account.amount || 0}

      />
      <button onClick={handleWithdrawal} id="widthdrawal">
        Withdrawal
      </button>
      <button onClick={handleDeposit} id="deposit">
        Deposit
      </button>
    </div>
  );
}

export default Bank;
