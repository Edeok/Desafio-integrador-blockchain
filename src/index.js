import { Contract, ethers } from "ethers";
//import { ethers } from "ethers/providers";
import { providers } from "ethers";



import usdcTknAbi from "../artifacts/contracts/USDCoin.sol/USDCoin.json";
import bbitesTokenAbi from "../artifacts/contracts/BBitesToken.sol/BBitesToken.json"
import publicSaleAbi from "../artifacts/contracts/PublicSale.sol/PublicSale.json"
import nftTknAbi from "../artifacts/contracts/CuyCollectionNft.sol/CuyCollectionNft.json"

//import "@openzeppelin/contracts/utils/Buffer.sol";


// SUGERENCIA: vuelve a armar el MerkleTree en frontend
// Utiliza la libreria buffer
import buffer from "buffer/";
import walletAndIds from "../wallets/walletList";
import { MerkleTree } from "merkletreejs";
var Buffer = buffer.Buffer;
var merkleTree;

function hashToken(tokenId, account) {
  return Buffer.from(
    ethers
      .solidityPackedKeccak256(["uint256", "address"], [tokenId, account])
      .slice(2),
    "hex"
  );
}
function buildMerkleTree() {
  var elementosHasheados;
  merkleTree = new MerkleTree(elementosHasheados, ethers.keccak256, {
    sortPairs: true,
  });
}

var provider, signer, account;
var usdcTkContract, bbitesTknContract, pubSContract, nftContract;
var usdcAddress, bbitesTknAdd, pubSContractAdd;

function initSCsGoerli() {
  provider = new ethers.BrowserProvider(window.ethereum);

  usdcAddress = "0x0F882e336199382182CBFaF5Dc38bEf65B831Cca";
  bbitesTknAdd = "0x85Ef59e0fBF9a43f8f19Ac805DDdfbeb6F5ff43F";
  pubSContractAdd = "0x1C8Dc7F7561F9bfDa75a6D5a76E684df2E29ec24";

  signer = provider.getSigner(account);
  usdcTkContract = new ethers.Contract(usdcAddress, usdcTknAbi, signer);
  bbitesTknContract = new ethers.Contract(bbitesTknAdd, bbitesTokenAbi, signer);
  pubSContract = new ethers.Contract(pubSContractAdd, publicSaleAbi, signer);
}





async function initSCsMumbai() {

  provider = new ethers.BrowserProvider(window.ethereum);
  var nftAddress = "0x11a385C7d30F99e1755beeE05ABF4099ADf5ABCA";

  signer = await provider.getSigner(account);
  nftContract = new ethers.Contract(nftAddress, nftTknAbi, signer);
}


 // Connect to Metamask
 var bttn = document.getElementById("connect");
 var walletIdEl = document.getElementById("walletId");

 bttn.addEventListener("click", async function () {
   if (window.ethereum) {
     [account] = await ethereum.request({
       method: "eth_requestAccounts",
     });
     console.log("Billetera metamask", account);
     walletIdEl.innerHTML = account;

     provider = new ethers.BrowserProvider(window.ethereum);
     signer = await provider.getSigner(account);
}
});
   
 

  // USDC Balance - balanceOf
  var bttn = document.getElementById("usdcUpdate");
  bttn.addEventListener("click", async function () {
    var balance = await  usdcTkContract.balanceOf(account);
    var balanceEl = document.getElementById("usdcBalance");
    balanceEl.innerHTML = ethers.formatUnits(balance, 6);
  });



  // Bbites token Balance - balanceOf


  var bttn = document.getElementById("approveButtonBBTkn");
  bttn.addEventListener("click", async function () {
    await bbitesTknContract.approve(targetAddress, amount);
    // Resto del código después de aprobar BBTKN
});

var bttn = document.getElementById("approveButtonUSDC");
bttn.addEventListener("click", async function () {
    await usdcTkContract.approve(targetAddress, amount);
    // Resto del código después de aprobar USDC
});


var bttn = document.getElementById("purchaseButton");
bttn.addEventListener("click", async function () {
    // Lógica para comprar NFTs con tokens
});

var bttn = document.getElementById("purchaseButtonUSDC");
bttn.addEventListener("click", async function () {
    // Lógica para comprar NFTs con USDC
});

var bttn = document.getElementById("purchaseButtonEtherId");
bttn.addEventListener("click", async function () {
    // Lógica para comprar NFTs con Ether e ID
});

  // send Ether
  var bttn = document.getElementById("sendEtherButton");

  var bttn = document.getElementById("getPriceNftByIdBttn");
  bttn.addEventListener("click", async function () {
      var nftId = parseInt(document.getElementById("priceNftIdInput").value);
  
      var precio;
  
      if (nftId >= 0 && nftId <= 199) {
          // Común: 1000 BBTKN fijo
          precio = 1000;
      } else if (nftId >= 200 && nftId <= 499) {
          // Raro: Multiplicar su id por 20
          precio = nftId * 20;
      } else if (nftId >= 500 && nftId <= 699) {
          // Legendario: Según días pasados
          // Aquí necesitas la lógica para calcular el precio según los días pasados
          // Supongamos que el precio se calcula como (días pasados * 5 BBTKN)
          var diasPasados = obtenerDiasPasadosParaNFT(nftId); // Esta función deberías implementarla
          precio = diasPasados * 5;
      } else if (nftId >= 700 && nftId <= 999) {
          // Místico: 0.01 ether fijo
          precio = 0.01; // El precio se indica en ether, no en BBTKN
      } else {
          // Para NFTs en el rango de la Whitelist (id >= 1000 y id <= 1999)
          // No hay un precio establecido
          precio = "Sin precio";
      }
  
      var priceNftByIdText = document.getElementById("priceNftByIdText");
      if (typeof precio === "number") {
          priceNftByIdText.innerHTML = precio + " BBTKN";
      } else {
          priceNftByIdText.innerHTML = precio;
      }
  });
  


var bttn = document.getElementById("getProofsButtonId");
bttn.addEventListener("click", async () => {
    var id = document.getElementById("inputIdProofId").value;
    var address = document.getElementById("inputAccountProofId").value;
    var proofs = merkleTree.getHexProof(hashToken(id, address));
    navigator.clipboard.writeText(JSON.stringify(proofs));
});


  // safeMintWhiteList
  var bttn = document.getElementById("safeMintWhiteListBttnId");
  // usar ethers.hexlify porque es un array de bytes
   var proofs = document.getElementById("whiteListToInputProofsId").value;
  proofs = JSON.parse(proofs).map(ethers.hexlify);

  // buyBack
  var bttn = document.getElementById("buyBackBttn");


function setUpEventsContracts() {
  var pubSList = document.getElementById("pubSList");
  // pubSContract - "PurchaseNftWithId"

  var bbitesListEl = document.getElementById("bbitesTList");
  // bbitesCListener - "Transfer"

  var nftList = document.getElementById("nftList");
  // nftCListener - "Transfer"

  var burnList = document.getElementById("burnList");
  // nftCListener - "Burn"
}

async function setUp() {
  window.ethereum.on("chainChanged", (chainId) => {
    window.location.reload();
  });

   initSCsGoerli();

   initSCsMumbai();

   setUpListeners();

  setUpEventsContracts();

   buildMerkleTree();
}
setUp()
  .then()
  .catch((e) => console.log(e));
