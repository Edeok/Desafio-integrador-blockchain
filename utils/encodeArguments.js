const Web3 = require('web3');


const web3 = new Web3();
const INFURA_API_KEY = '1231b30032504c099af3f84d19299053';
const ETHERSCAN_API_KEY = 'A2PMJ5DF96E72P1RKHAHU6I657YVQEFBHV';
const POLYGONSCAN_API_KEY = 'CV3ISKNIBX3E2XAX31FFQ8RB9X4NXD9PQF';

const GOERLI_TESTNET_URL = 'https://goerli.infura.io/v3/' + INFURA_API_KEY;

// Direcciones de los contratos (asumo que las obtienes de alguna parte)
const _bbTokenAddress = "0x9736520647D6A9Ad1B8Cdf3048b9c61779a3A821";
const _usdcTokenAddress = "0x38B067D4ed4449603743f7a3c65A6441Ac950DAF";
const _uniswapRouterAddress = "0x195250db8E525d40278eC0D7D081FD0B9bC37299";

// Codificar los argumentos en formato ABI
const abiEncoder = web3.eth.abi.encodeParameters(
  ['address', 'address', 'address'],
  [_bbTokenAddress, _usdcTokenAddress, _uniswapRouterAddress]
);

console.log('Argumentos codificados en formato ABI:', abiEncoder);

// Ejemplo de cómo usar la URL de Infura para interactuar con Ethereum (Goerli Testnet)
const web3Goerli = new Web3(GOERLI_TESTNET_URL);


