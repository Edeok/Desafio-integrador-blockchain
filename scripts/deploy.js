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
    var relAddGoerli = "0x6122D4939B63A37cbdFDD1E40564a7Afd5163708"; // Dirección del relayer en Goerli

    // Despliega el contrato USDCoin en Goerli utilizando deploySC
    const USDCoinAddress = await deploySCNoUp1("USDCoin", "USDC", relAddGoerli);
    console.log(
      "Contrato USDCoin desplegado en Goerli en la dirección:",
      USDCoinAddress
    );

    // Puedes configurar y realizar otras acciones necesarias para estos contratos aquí.

    await verify(USDCoinAddress, "USDCoin");
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
