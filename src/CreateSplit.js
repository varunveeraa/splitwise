import React, { useState } from 'react';
import { contract } from './web3';

const CreateSplit = ({ onSplitCreated }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const createSplit = async (event) => {
    event.preventDefault();
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      await contract.methods.createSplit(amount, description).send({
        from: accounts[0],
        gas: '3000000',
      });
      alert('Split Created!');
      onSplitCreated();
    } catch (error) {
      console.error('Error creating split:', error.message);
      alert(`Error creating split: ${error.message}`);
    }
  };

  return (
    <form onSubmit={createSplit}>
      <div>
        <label>Amount</label>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount in Wei"
        />
      </div>
      <div>
        <label>Description</label>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
        />
      </div>
      <button type="submit">Create Split</button>
    </form>
  );
};

export default CreateSplit;
