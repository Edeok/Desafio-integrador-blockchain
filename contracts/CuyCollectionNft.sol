// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/cryptography/MerkleProofUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

interface BBTKN {
    function mint(address account, uint256 amount) external;
}

contract CuyCollectionNft is Initializable, ERC721EnumerableUpgradeable, PausableUpgradeable, AccessControlUpgradeable {
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    bytes32 public root;
    BBTKN public bbtknContract;

    event Burn(address account, uint256 id);

    function initialize(
        string memory _name,
        string memory _symbol,
        address _bbtknContract
    ) public initializer {
        __Context_init_unchained();
        __ERC165_init_unchained();
        __ERC721_init_unchained(_name, _symbol);
        __ERC721Enumerable_init_unchained();
        __Pausable_init_unchained();
        __AccessControl_init_unchained();

        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(PAUSER_ROLE, msg.sender);
        _setupRole(MINTER_ROLE, msg.sender);

        bbtknContract = BBTKN(_bbtknContract);
    }

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://QmNqpcfrExrJgMZJ5HV8dKg2Pj2Spp2qdSozNSniLXFEhx/metadata/";
    }

    function safeMint(
        address to,
        uint256 tokenId
    ) public onlyRole(MINTER_ROLE) whenNotPaused {
        require(tokenId >= 0 && tokenId <= 999, "Token ID out of range");
        _safeMint(to, tokenId);
    }

    function safeMintWhiteList(
        address to,
        uint256 tokenId,
        bytes32[] calldata proofs
    ) public whenNotPaused {
        require(tokenId >= 0 && tokenId <= 999, "Token ID out of range");
        require(proofs.length > 0, "Proofs array cannot be empty");
        require(MerkleProofUpgradeable.verify(proofs, root, keccak256(abi.encodePacked(to, tokenId))), "Invalid proof");
        _safeMint(to, tokenId);
    }

    function buyBack(uint256 id) public whenNotPaused {
        require(id >= 1000 && id <= 1999, "Invalid ID for buyback");
        require(ownerOf(id) == msg.sender, "You do not own this NFT");
        _burn(id);
        emit Burn(msg.sender, id);
        bbtknContract.mint(msg.sender, 10000); // Mint 10,000 BBTKNs to the sender
    }
    
    function supportsInterface(bytes4 interfaceId) public view override(ERC721EnumerableUpgradeable, AccessControlUpgradeable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function burn(uint256 tokenId) public whenNotPaused {
        require(_isApprovedOrOwner(msg.sender, tokenId), "Not approved");
        _burn(tokenId);
    }

    function pause() public onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(PAUSER_ROLE) {
        _unpause();
    }
}
