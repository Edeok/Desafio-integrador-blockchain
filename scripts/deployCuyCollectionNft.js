require("dotenv").config();

const { 
  getRole,
  verify,
  ex,
  printAddress,
  deploySC,
  deploySCNoUp1,
  deploySCNoUp
} = require("../utils");


async function deployMumbai() {
  try {
    // Dirección del relayer en Goerli
    var relAddMumbai = "0x6122D4939B63A37cbdFDD1E40564a7Afd5163708";

    // Define name y symbol para el contrato CuyCollectionNft
    var _name = "CuyCollectionNft"; // Nombre del contrato
    var _symbol = "CUYNFT";
    //var _bbtknContract ='0x9736520647D6A9Ad1B8Cdf3048b9c61779a3A821';
    var _bbtknContract = "0x85Ef59e0fBF9a43f8f19Ac805DDdfbeb6F5ff43F";

    // Despliega el contrato CuyCollectionNft en Mumbai utilizando deploySCNoUp
    const CuyCollectionNftAddress = await deploySCNoUp1(
      "CuyCollectionNft", // Nombre del contrato
      _name, _symbol, _bbtknContract, relAddMumbai// Argumentos del constructor como un arreglo
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