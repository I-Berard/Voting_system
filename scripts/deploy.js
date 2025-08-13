const hre = require('hardhat');

async function main() {
    const proposals = ["Alice", "Bob", "Charlie"].map(name => 
        hre.ethers.encodeBytes32String(name)
    );

    const Ballot = await hre.ethers.getContractFactory("Ballot");
    const ballot = await Ballot.deploy(proposals);

    await ballot.waitForDeployment()

    console.log("Ballot deployed to: ", (await ballot).target);
}

main().catch((err) => {
    console.error(err);
    process.exitCode = 1;
})