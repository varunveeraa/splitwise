import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import splitABI from './splitABI.json'; // Assuming ABI is stored here

const SplitInteraction = ({ splitAddress }) => {
  const [splitContract, setSplitContract] = useState(null);
  const [creator, setCreator] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [payeeCount, setPayeeCount] = useState(0);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    const loadContract = async () => {
      const web3 = new Web3(window.ethereum);
      try {
        const contract = new web3.eth.Contract(splitABI, splitAddress);
        setSplitContract(contract);
      } catch (error) {
        console.error('Error loading contract:', error);
      }
    };

    loadContract();
  }, [splitAddress]);

  useEffect(() => {
    if (splitContract) {
      const loadDetails = async () => {
        try {
          const creator = await splitContract.methods.creator().call();
          const amount = await splitContract.methods.amount().call();
          const description = await splitContract.methods.description().call();
          const payeeCount = await splitContract.methods.payeeCount().call();
          const status = await splitContract.methods.status().call();

          setCreator(creator);
          setAmount(amount);
          setDescription(description);
          setPayeeCount(payeeCount.toString());
          setStatus(status);
        } catch (error) {
          console.error('Error loading details:', error);
        }
      };

      loadDetails();
    }
  }, [splitContract]);

  // Function to join the split
  const joinSplit = async () => {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      await splitContract.methods.joinSplit().send({ from: accounts[0], gas: '3000000' });
      alert('You joined the split!');
      // Optionally, reload the payeeCount after joining
      const newPayeeCount = await splitContract.methods.payeeCount().call();
      setPayeeCount(newPayeeCount.toString());
    } catch (error) {
      console.error('Error joining split:', error);
    }
  };

  // Function to enable payment
  const enablePayment = async () => {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      await splitContract.methods.enablePayment().send({ from: accounts[0], gas: '3000000' });
      alert('Payment enabled!');
    } catch (error) {
      console.error('Error enabling payment:', error);
    }
  };

  // Function to pay the share
  const payShare = async () => {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const paymentAmount = amount / payeeCount; // Calculate the amount each payee should contribute
      await splitContract.methods.payShare().send({
        from: accounts[0],
        value: paymentAmount,
        gas: '3000000',
      });
      alert('Share paid!');
    } catch (error) {
      console.error('Error paying share:', error);
    }
  };

  // Function to close the split
  const closeSplit = async () => {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      await splitContract.methods.closeSplit().send({ from: accounts[0], gas: '3000000' });
      alert('Split closed!');
      setStatus(true); // Update status to closed
    } catch (error) {
      console.error('Error closing split:', error);
    }
  };

  return (
    <div>
      <h2>Interact with Split</h2>
      <p><strong>Creator:</strong> {creator}</p>
      <p><strong>Amount:</strong> {amount} Wei</p>
      <p><strong>Description:</strong> {description}</p>
      <p><strong>Payee Count:</strong> {payeeCount}</p>
      <p><strong>Status:</strong> {status ? 'Closed' : 'Open'}</p>

      <button onClick={joinSplit} disabled={status}>Join Split</button>
      <button onClick={enablePayment} disabled={status || !creator}>Enable Payment</button>
      <button onClick={payShare} disabled={status}>Pay Share</button>
      <button onClick={closeSplit} disabled={status || !creator}>Close Split</button>
    </div>
  );
};

export default SplitInteraction;
