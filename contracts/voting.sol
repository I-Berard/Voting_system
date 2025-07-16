// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.30;

contract Ballot{
    struct Voter {
        uint weight;
        bool voted;
        address delegated;
        uint vote;
    }

    struct Proposal {
        bytes32 name;
        uint voteCount;
    }

    address public chairperson;

    Proposal[] public proposals;

    mapping(address => Voter) voters;

    constructor(bytes32[] memory proposalNames) {
        chairperson = msg.sender;
        voters[chairperson].vote = 1;

        for(uint i = 0; i < proposalNames.length; i++){
            proposals.push(Proposal({
                name: proposalNames[i],
                voteCount: 0
            }));
        }
    }

    function giveRightToVote(address voter) external {
        require(msg.sender == chairperson, "You are not allowed to perform this action");
        require(!voters[voter].voted, "Voter has already voted");
        require(voters[voter].weight == 0);
        voters[voter].weight = 1;
    }

    function delegate(address to) external {
        Voter storage sender = voters[msg.sender];
        require(sender.weight != 0, "You are unable to vote");
        require(!sender.voted, "You have already voted");
        require(to != msg.sender, "Self-delegation isn't allowed");

        while(voters[to].delegated != address(0)){
            to = voters[to].delegated;

            require(to != msg.sender, "Found loop in delegation");
        }

        Voter storage delegate_ = voters[to];
        require(delegate_.weight >= 1);

        sender.voted = true;
        sender.weight = 0;

        if(delegate_.voted){
            proposals[delegate_.vote].voteCount += sender.weight;
        }else{
            delegate_.weight += sender.weight;
        }
    }

    function vote(uint proposal) external {
        Voter storage sender = voters[msg.sender];
        require(!sender.voted, "You have already voted");
        require(sender.weight != 0, "Doesn't have the right to vote");
        sender.voted = true;
        sender.vote = proposal;

        proposals[proposal].voteCount += sender.weight;      
    }

    function winningProposal() public view returns(uint winningProposal_) {
        uint highestVote = 0;
        for(uint m = 0; m < proposals.length; m++) {
            if(proposals[m].voteCount > highestVote) {
                highestVote = proposals[m].voteCount;
                winningProposal_ = m;
            }
        }
    }

    function winnerName() external view returns(bytes32 winnerName_){
        winnerName_ = proposals[winningProposal()].name;
    }
}
