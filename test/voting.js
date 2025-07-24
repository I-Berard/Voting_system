const { expect } = require('chai');
const { ethers } = require('hardhat');

describe("Ballot", () => {
    let Ballot, ballot;
    let chairperson, voter1, voter2;

    beforeEach( async () => {
        [chairperson, voter1, voter2, _] = await ethers.getSigners();
        const proposalNames = ["Proposal A", "Proposal B", "Proposal C"].map((name) => ethers.encodeBytes32String(name));
        
        Ballot = await ethers.getContractFactory("Ballot");
        ballot = await Ballot.deploy(proposalNames);
        await ballot.waitForDeployment();
    })

    it("Should give right to vote", async () => {
        await ballot.giveRightToVote(voter1.address);
        const voter = await ballot.voters(voter1.address);
        expect(voter.weight).to.equal(1);
    })

    it("Should allow a vote and count it", async () => {
        await ballot.giveRightToVote(voter1.address);
        await ballot.connect(voter1).vote(0);
        
        const proposal = await ballot.proposals(0);
        expect(proposal.voteCount).to.equal(1);
    })

    it("Should delegate vote properly", async () => {
        await ballot.giveRightToVote(voter1.address);
        await ballot.giveRightToVote(voter2.address);

        await ballot.connect(voter1).delegate(voter2.address);
        await ballot.connect(voter2).vote(1);

        const proposal = await ballot.proposals(1);
        expect(proposal.voteCount).to.equal(2);
    })

    it("Should find the winner", async () => {
        await ballot.giveRightToVote(voter1.address);
        await ballot.connect(voter1).vote(1);

        const winnerNameBytes = await ballot.winnerName();
        const winner = await ethers.decodeBytes32String(winnerNameBytes);
        expect(winner).to.equal("Proposal B")
    })
})
