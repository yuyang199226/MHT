// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract FrogNFT is ERC721URIStorage {
    
    uint256 public counter;

    constructor() ERC721("frogNFT", "FROGNFT") {
        counter = 0;
    }
    function createNFTs(string memory tokenURI)  public returns(uint256) {
        uint256 tokenId = counter;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI);
        counter++;
        return tokenId;
    }

    function burn(uint256 tokenId) public virtual{
        require(_isAuthorized(_ownerOf(tokenId), msg.sender, tokenId), "you are not the owner or be approved");
        super._burn(tokenId);
    }

}

