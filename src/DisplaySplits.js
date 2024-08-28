import React, { useState, useEffect } from 'react';
import { contract } from './web3';
import SplitInteraction from './SplitInteraction';

const DisplaySplits = () => {
  const [splits, setSplits] = useState([]);
  const [selectedSplit, setSelectedSplit] = useState(null);

  const fetchSplits = async () => {
    try {
      const deployedSplits = await contract.methods.getDeployedSplits().call();
      setSplits(deployedSplits);
    } catch (error) {
      console.error('Error fetching splits:', error.message);
    }
  };

  useEffect(() => {
    fetchSplits();
  }, []);

  return (
    <div>
      <h3>Deployed Splits</h3>
      <ul>
        {splits.map((split, index) => (
          <li key={index}>
            <button onClick={() => setSelectedSplit(split)}>
              {split}
            </button>
          </li>
        ))}
      </ul>
      {selectedSplit && <SplitInteraction splitAddress={selectedSplit} />}
    </div>
  );
};

export default DisplaySplits;
