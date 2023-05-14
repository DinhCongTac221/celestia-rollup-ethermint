import { useState, useEffect } from 'react';
import './Faucet.css';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import axios from "axios";

function FaucetPage() {
  const [walletAddress, setWalletAddress] = useState('');
  const [faucetAvailable, setFaucetAvailable] = useState(0);
  const [loading, setLoading] = useState(false); 

  const VITE_API_DOMAIN = import.meta.env.VITE_APP_API;

  const fetchData = async () => {
    try {
      let response = await axios({
        method: "GET",
        url: `${VITE_API_DOMAIN}/check-balance-faucet`,
        maxContentLength: 100000000,
      });
      setFaucetAvailable(+response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
        fetchData();        
    }, 5000);
    return () => clearInterval(interval);
  }, []);  

  const handleRequest = async () => {
    setLoading(true);    
    try {      
      if(ethers.utils.isAddress(walletAddress)) {
        const bodyData = {
          wallet: walletAddress         
        };
        //send to BE
        const sendFaucetRequest = await axios({
            method: "POST",
            url: `${VITE_API_DOMAIN}/faucet`,
            data: bodyData,
        });        
        if (sendFaucetRequest.status === 200) {
          toast.success('Faucet Successfully. Please check your wallet balance!');
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
      <h2>Enter your ethermint wallet to get free 2 ETH Testnet
        <br />
        and create your own token
      </h2>
      <h3> Available: {parseInt(faucetAvailable)} ETH</h3>
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
