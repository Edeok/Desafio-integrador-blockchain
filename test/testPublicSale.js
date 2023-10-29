const { expect } = require("chai");
const { ethers } = require("hardhat");
const { accounts } = require("hardhat");

//const publicSale = require("../contracts/PublicSale.sol");


// En tu archivo de pruebas (testPublicSale.js por ejemplo)
//const { _bbTokenAddress, _usdcTokenAddress, _uniswapRouterAddress } = require("../scripts/deployPublicSale.js");
const { DEFAULT_ADMIN_ROLE, PAUSER_ROLE, UPGRADER_ROLE, EXECUTER_ROLE } = require("../contracts/PublicSale.sol");
//let publicSale = new publicSale();


describe("PublicSale Contract", function () {
     //let publicSale;
    // let _bbTokenAddress; // Dirección del contrato del token BB
    // let _usdcTokenAddress; // Dirección del contrato del token USDC
    // let _uniswapRouterAddress; // Dirección del contrato del router de Uniswap
  
    beforeEach(async function () {
        
     publicSale = await ethers.getContractFactory("PublicSale");
     // publicSale = await PublicSale.deploy(_bbTokenAddress, _usdcTokenAddress, _uniswapRouterAddress);
      await publicSale.deployed();
    });
  
    // Resto de las pruebas...
  });

  it("should do something", async function () {
    // Escribe tu prueba aquí
  });

  it("should have correct initial values", async function () {
    // Verificar el role DEFAULT_ADMIN_ROLE
    const isAdmin = await publicSale.hasRole(DEFAULT_ADMIN_ROLE, accounts[0]);
    expect(isAdmin).to.be.true;
  
    // Verificar el role PAUSER_ROLE
    const isPauser = await publicSale.hasRole(PAUSER_ROLE, accounts[0]);
    expect(isPauser).to.be.true;
  
    // Verificar el role UPGRADER_ROLE
    const isUpgrader = await publicSale.hasRole(UPGRADER_ROLE, accounts[0]);
    expect(isUpgrader).to.be.true;
  
    // Verificar el role EXECUTER_ROLE
    const isExecuter = await publicSale.hasRole(EXECUTER_ROLE, accounts[0]);
    expect(isExecuter).to.be.true;
  
    // Verificar las direcciones de los contratos de tokens y el router de Uniswap
    const bbTokenAddress = await publicSale.bbToken();
    expect(bbTokenAddress).to.equal(expectedBbTokenAddress);
  
    const usdcTokenAddress = await publicSale.usdcToken();
    expect(usdcTokenAddress).to.equal(expectedUsdcTokenAddress);
  
    const uniswapRouterAddress = await publicSale.router();
    expect(uniswapRouterAddress).to.equal(expectedUniswapRouterAddress);
  });
  

  it("should handle token purchases correctly", async function () {
    // Escribe pruebas para verificar el proceso de compra con tokens
    // por ejemplo:
     const initialBalance = await publicSale.getTokenBalance(accounts[0]);
     await publicSale.purchaseWithTokens(0, { from: accounts[0] });
     const finalBalance = await publicSale.getTokenBalance(accounts[0]);
     expect(finalBalance).to.equal(initialBalance - 1);
  });

  it("should handle USDC purchases correctly", async function () {
    // Escribe pruebas para verificar el proceso de compra con USDC
    // por ejemplo:
     const initialUSDCBalance = await usdcToken.balanceOf(accounts[0]);
     await usdcToken.approve(publicSale.address, 100, { from: accounts[0] });
     await publicSale.purchaseWithUSDC(0, { from: accounts[0] });
     const finalUSDCBalance = await usdcToken.balanceOf(accounts[0]);
     expect(finalUSDCBalance).to.equal(initialUSDCBalance - 100);
  });

  it("should handle ether purchases correctly", async function () {
    // Escribe pruebas para verificar el proceso de compra con ether
    // por ejemplo:
     const initialEtherBalance = await web3.eth.getBalance(accounts[0]);
     await publicSale.purchaseWithEtherAndId(700, { from: accounts[0], value: web3.utils.toWei("0.01", "ether") });
     const finalEtherBalance = await web3.eth.getBalance(accounts[0]);
     expect(finalEtherBalance).to.be.below(initialEtherBalance);
  });

  it("should handle whitelist purchases correctly", async function () {
    // Escribe pruebas para verificar el proceso de compra desde la lista blanca
    // por ejemplo:
     const initialBalance = await publicSale.getWhitelistBalance(accounts[0]);
     await publicSale.purchaseFromWhitelist(1000, { from: accounts[0] });
     const finalBalance = await publicSale.getWhitelistBalance(accounts[0]);
     expect(finalBalance).to.equal(initialBalance - 1);
  });

  it("should handle buy back correctly", async function () {
    // Escribe pruebas para verificar el proceso de recompra
    // por ejemplo:
     const initialBalance = await publicSale.getTokenBalance(accounts[0]);
     await publicSale.buyBack(1000, { from: accounts[0] });
     const finalBalance = await publicSale.getTokenBalance(accounts[0]);
     expect(finalBalance).to.equal(initialBalance + 10000);
  });
 //module.exports = publicSale;

