const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const FrogNFTModule = buildModule("FrogNFTModule", (m) => {
  const frog = m.contract("FrogNFT");

  return { frog };
});

module.exports = FrogNFTModule;