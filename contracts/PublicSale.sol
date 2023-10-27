// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import {IUniSwapV2Router02} from "./Interfaces.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";

// Creamos una base personalizada que combina las funcionalidades deseadas
contract PublicSale is Initializable, PausableUpgradeable, AccessControlUpgradeable, UUPSUpgradeable {
    IUniSwapV2Router02 router;
    IERC20 usdcToken;
    IERC20Upgradeable bbToken;
 

    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");
    bytes32 public constant EXECUTER_ROLE = keccak256("EXECUTER_ROLE");

    uint256 constant startDate = 1696032000;
    uint256 constant MAX_PRICE_NFT = 90_000 * 10 ** 18;

    

   function initialize(
        address _bbTokenAddress,
        address _usdcTokenAddress,
        address _uniswapRouterAddress
    ) public initializer {
        __Pausable_init();
        __AccessControl_init();
        __UUPSUpgradeable_init();

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(PAUSER_ROLE, msg.sender);
        _grantRole(UPGRADER_ROLE, msg.sender);
        _grantRole(EXECUTER_ROLE, msg.sender);

        usdcToken = IERC20(_usdcTokenAddress);
        bbToken = IERC20Upgradeable(_bbTokenAddress);
        router = IUniSwapV2Router02(_uniswapRouterAddress);
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyRole(UPGRADER_ROLE) {
        // Aquí puedes agregar lógica personalizada para autorizar actualizaciones si es necesario
    }

    function purchaseWithTokens(uint256 _id) public view returns (uint256) {
        require(_id >= 0 && _id <= 699, "Invalid ID range");
        return getPriceForId(_id);
    }

    function purchaseWithUSDC(uint256 _id) external view returns(uint256) {
        require(_id >= 0 && _id <= 699, "Invalid ID range");
        return getPriceForId(_id);
    }

    function purchaseWithEtherAndId(uint256 _id) public payable returns(uint256) {
        require(_id >= 700 && _id <= 999, "Invalid ID range");
        require(msg.value >= 0.01 ether, "Insufficient ether sent");
        return getPriceForId(_id);
    }

    function depositEthForARandomNft() public payable {
        require(msg.value == 0.01 ether, "Invalid ether amount");
    }

    receive() external payable {
        depositEthForARandomNft();
    }

    function pause() public onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    function getPriceForId(uint256 id) public view returns(uint256) {
        require(id >= 0 && id <= 699, "Invalid ID range");

        if (id <= 199) {
            return 1000 * 10 ** 18;
        } else if (id <= 499) {
            return id * 20 * 10 ** 18;
        } else if (id <= 699) {
            uint256 daysPassed = (block.timestamp - startDate) / 86400;
            uint256 price = 10000 * 10 ** 18 + (daysPassed * 2000 * 10 ** 18);
            return price > MAX_PRICE_NFT ? MAX_PRICE_NFT : price;
        } else {
            revert("Invalid ID range");
}
}
}