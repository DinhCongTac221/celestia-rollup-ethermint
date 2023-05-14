import { useState } from 'react';
import './Faucet.css';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';

function FaucetPage() {
  const [walletAddress, setWalletAddress] = useState('');
  const [loading, setLoading] = useState(false); 

  const handleRequest = async () => {
    setLoading(true);    
    try {
      console.log(ethers.utils.isAddress(walletAddress));
      if(ethers.utils.isAddress(walletAddress)) {
        const response = await fetch('https://celestia-dapp-api.thinhpn.com/faucet', {
          method: 'POST',
          body: JSON.stringify({ walletAddress }),
        });
        if (response.ok) {
          toast.success('Faucet Successfully');
        } else {
          toast.error('Faucet Fail! Please try again later!');          
        }
      }
      else {
        toast.error('Your wallet address is invalid!');
      }      
    } catch (error) {
      toast.error('Faucet Fail! Please try again later!');
    }
    setLoading(false);
  };  

  return (
    <div className="faucet-container">
      <h2>Enter your ethermint wallet to get free 5 ETH Testnet
        <br />
        and create your own token
      </h2>
      <input
        className="wallet-input"
        type="text"
        value={walletAddress}
        onChange={(e) => setWalletAddress(e.target.value)}
        placeholder="Enter your wallet address"
      />
      <button className="request-button" onClick={handleRequest} disabled={loading}>
        Request
      </button>
      {loading && <div className="loading">Loading...</div>}     
    </div>
  );
}

export default FaucetPage;
