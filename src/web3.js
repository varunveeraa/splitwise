import Web3 from 'web3';

// Use the provider from Metamask
const web3 = new Web3(window.ethereum);

const contractAddress = '0xB67A293B227d825f237EddEB4c7F37C07C22dF11';
const contractABI = [{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"deployedSplits","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"},{"name":"desc","type":"string"}],"name":"createSplit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getDeployedSplits","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"}]  

const contract = new web3.eth.Contract(contractABI, contractAddress);

export { web3, contract };
