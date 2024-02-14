import React, { useState } from 'react';
import { initContract } from '../ZapitTradeContract';
// import { ethers } from "ethers";
const { ethers } = require("ethers");

function CreateOrderComponent() {
  const [tokenAddress, setTokenAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [isERC20, setIsERC20] = useState(false);

  const handleCreateOrder = async () => {
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const contract = initContract();

        const transaction = await contract.createOrder(tokenAddress, ethers.utils.parseUnits(amount, 18), isERC20);
        await transaction.wait();

        alert('Order created successfully!');
      } else {
        alert('Ethereum wallet is not connected. Please install MetaMask.');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to create the order.');
    }
  };

  return (
    <div>
      <h2>Create Order</h2>
      <input
        type="text"
        value={tokenAddress}
        onChange={(e) => setTokenAddress(e.target.value)}
        placeholder="Token Address"
      />
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
      />
      <label>
        <input
          type="checkbox"
          checked={isERC20}
          onChange={(e) => setIsERC20(e.target.checked)}
        /> Is ERC20
      </label>
      <button onClick={handleCreateOrder}>Create Order</button>
    </div>
  );
}

export default CreateOrderComponent;