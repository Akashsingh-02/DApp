const Dex = artifacts.require("Dex");
const ERC20Mock = artifacts.require("ERC20Mock");

const USDC_MAINNET = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
const UNLOCKED_ACCOUNT = "0x6262998ced04146fa42253a5c0af90ca02dfd2a3";

module.exports = async function (deployer, networks, accounts) {
    const usdc = await ERC20Mock.at(USDC_MAINNET);
   
    await deployer.deploy(Dex, {
        from: accounts[0],
        value: "10000000000000000000",
    });

    const dex = await Dex.deployed();

    //USDC from unlocked acc to Dex contract
    await usdc.transfer(dex.address, 1000000000, {
        from: UNLOCKED_ACCOUNT,
    });

    //USDC from Unlocked acc to user account
    await usdc.transfer(accounts[1], 1000000000, {
        from: UNLOCKED_ACCOUNT,
    });
};