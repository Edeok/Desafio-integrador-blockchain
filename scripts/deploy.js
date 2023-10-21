require("dotenv").config();

const { 
  getRole,
  verify,
  ex,
  printAddress,
  deploySC,
  deploySCNoUp,
} = require("../utils");

const { getRootFromMT } = require("../utils/merkleTree");
var MINTER_ROLE = getRole("MINTER_ROLE");
var BURNER_ROLE = getRole("BURNER_ROLE");

async function deployGoerli() {
  try {
    var relAddGoerli = "0x6122D4939B63A37cbdFDD1E40564a7Afd5163708"; // Dirección del relayer en Goerli

  // Despliega el contrato PublicSale en Goerli utilizando deploySC
    const publicSaleAddress = await deploySC(
     "PublicSale", "PSALE",
      relAddGoerli);
    console.log("Contrato PublicSale desplegado en Goerli en la dirección:", publicSaleAddress);

   

    // Despliega el contrato BBitesToken en Goerli utilizando deploySC
    const bbitesTokenAddress = await deploySC(
     "BBitesToken","BBTKN",
      relAddGoerli);
    console.log("Contrato BBitesToken desplegado en Goerli en la dirección:", bbitesTokenAddress);


    // Despliega el contrato USDCoin en Goerli utilizando deploySC
    const USDCoinAddress = await deploySC(
     "USDCoin", "USDC", 
      relAddGoerli);
    console.log("Contrato USDCoin desplegado en Goerli en la dirección:", USDCoinAddress);

    // Puedes configurar y realizar otras acciones necesarias para estos contratos aquí.

   
    await verify(publicSaleAddress, "PublicSale");
    await verify(bbitesTokenAddress, "BBitesToken");
    await verify(USDCoinAddress, "USDCoin");
  } catch (error) {
    console.error("Error al desplegar contratos en Goerli:", error);
    process.exit(1);
  }
}

// Llama a la función para desplegar los contratos en Goerli
deployGoerli()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
