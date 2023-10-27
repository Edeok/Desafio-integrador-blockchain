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

    // Despliega el contrato BBitesToken en Goerli utilizando deploySC
    const bbitesTokenAddress = await deploySCNoUp1(
      "BBitesToken",
      "BBTKN",
      relAddGoerli
    );
    console.log(
      "Contrato BBitesToken desplegado en Goerli en la dirección:",
      bbitesTokenAddress
    );

    await verify(bbitesTokenAddress, "BBitesToken");
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
