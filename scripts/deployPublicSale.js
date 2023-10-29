require("dotenv").config();

const { 
  getRole,
  verify,
  ex,
  printAddress,
  deploySC,
  deploySCNoUp,
  deploySCNoUp1,
} = require("../utils");
 

async function deployGoerli() {
    try {
        var relAddGoerli = "0x6122D4939B63A37cbdFDD1E40564a7Afd5163708";
        var _bbTokenAddress = "0x85Ef59e0fBF9a43f8f19Ac805DDdfbeb6F5ff43F";
        //var _usdcTokenAddress = "0x0F882e336199382182CBFaF5Dc38bEf65B831Cca";
        var _usdcTokenAddress = "0x3bf4695D5526b92c071A27fd9B106B5b1309b491";
        //var  _uniswapRouterAddress = "0x195250db8E525d40278eC0D7D081FD0B9bC37299";
        var  _uniswapRouterAddress = "0xFfcD157b74206B30A3A0464217C3e592531D6005"
         
        const publicSaleAddress = await deploySCNoUp1("PublicSale", "PSALE", relAddGoerli,  _bbTokenAddress,
        _usdcTokenAddress,
        _uniswapRouterAddress);
        console.log("Contrato PublicSale desplegado en Goerli en la dirección:", publicSaleAddress);
    } catch (error) {
        console.error("Error al desplegar contratos en Goerli:", error);
        process.exit(1);
    }
}

// Llama a la función para desplegar los contratos en Goerli
deployGoerli().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
