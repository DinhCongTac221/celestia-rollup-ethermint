import { useState, useEffect } from 'react';
import './Faucet.css';
import { ethers } from 'ethers';

function FaucetPage() {
  const [walletAddress, setWalletAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState('');  

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
          setToastMessage('Faucet Successfully');
        } else {
          setToastMessage('Faucet Fail! Please try again later!');
        }
      }
      else {
        setToastMessage('Your wallet address is invalid!');
      }      
    } catch (error) {
      setToastMessage('Faucet Fail! Please try again later!');
    }
    setLoading(false);
  };

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage('');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  return (
    <div className="faucet-container">
      <h2>Enter your ethermint wallet to get free 5 ETH Testnet
        <br />
        and create your own token</h2>
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
      {toastMessage && <div className={`toast ${toastMessage.includes('Fail') ? 'error' : toastMessage.includes('invalid') ? 'invalid' : 'success'}`}>{toastMessage}</div>}
    </div>
  );
}

export default FaucetPage;
