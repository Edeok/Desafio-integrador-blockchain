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



async function deployMumbai() {
  try {
    // Dirección del relayer en Goerli
    var relAddMumbai = "0x6122D4939B63A37cbdFDD1E40564a7Afd5163708";

    // Define name y symbol para el contrato CuyCollectionNft
    var _name = "CuyCollectionNft"; // Nombre del contrato
    var _symbol = "CUYNFT";
    const _bbtknContract ='0xE128C7971c2c11760434AE99FEc50C9e1d9c9FcC';

    // Despliega el contrato CuyCollectionNft en Mumbai utilizando deploySCNoUp
    const CuyCollectionNftAddress = await deploySCNoUp(
      "CuyCollectionNft", // Nombre del contrato
      [_name, _symbol, _bbtknContract], relAddMumbai// Argumentos del constructor como un arreglo
    );

    console.log("Contrato CuyCollectionNft desplegado en Mumbai en la dirección:", CuyCollectionNftAddress);

    // Verifica el contrato en Mumbai si es necesario
     await verify(CuyCollectionNftAddress.target, "CuyCollectionNft");
    
  } catch (error) {
    console.error("Error al desplegar contratos en Mumbai:", error);
    process.exit(1);
  }
}


// Llama a la función para desplegar los contratos en Mumbai
deployMumbai()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });