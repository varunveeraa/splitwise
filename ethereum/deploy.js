const HDWalletProvider = require("@truffle/hdwallet-provider");
const { Web3 } = require("web3");
const compiledFactory = require("./build/SplitFactory.json");

const provider = new HDWalletProvider(
  "agree raise tree foot laptop razor fiber metal real agree congress ability",
  "https://sepolia.infura.io/v3/febb9c100f7c48fc98e0e76055995b11"
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: "1000000", from: accounts[0] });

  console.log("Contract deployed to", result.options.address);
  console.log("Contract ABI:", compiledFactory.interface);
  provider.engine.stop();
};
deploy();