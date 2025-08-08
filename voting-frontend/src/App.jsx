import { useState } from 'react';
import { connetWallet } from './metamask';

function App(){
  const [contract, setContract] = useState(null)
  const [proposalId, setProposalId] = useState("")
  const [winner, setWinner] = useState("")
  
  const handleConnect = async () => {
    const { contract } = await connetWallet();
    setContract(contract);
  }

  const vote = async () => {
    if(!contract) return alert("Connect wallet first");

    const tx = await contract.vote(proposalId);
    await tx.wait();
    alert("Vote submitted");
  }

  const findWinner = async () => {
    const winner = await contract.winnerName();
    setWinner(winner);
  }

  return (
    <div>
      <button onClick={handleConnect}>Connect Wallet</button>
      <input
        value={proposalId}
        onChange={(e) => setProposalId(e.target.value)}
        placeholder="Proposal ID"
      />
      <button onClick={vote}>Vote</button>
      <button onClick={findWinner}>Find winner</button>
      {winner && <p>{winner}</p>}
    </div>
  );
}

export default App;