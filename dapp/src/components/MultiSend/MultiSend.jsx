import "./MultiSend.css";
import React from 'react';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import MultiSendContract from "../../abi/MultiSend.json";
import StandardTokenContract from "../../abi/StandardToken.json";

async function executingMultisend(ethers, signer, abi, contract_address, token_address, toAddresses, amounts) {
  try {
    toast.success('Multisend token success!');
    return true;
  } catch (error) {    
    toast.error('Error sending token!');
    return false;
  }
}

async function checkTokenContractValid(ethers, signer, abi, token_address) {
  try {
    if(ethers.utils.isAddress(token_address)){
      const tokenContract = new ethers.Contract(token_address, abi, signer);    
      const totalSupply = await tokenContract.totalSupply();    
      if(+totalSupply > 0)
        return true;
      else
        return false;
    }
    else 
      return false;   
  } catch (error) {
    console.log(error);
    return false;
  }
}

function checkValidAddressesAndAmount(addresesWithAmount) {
  try {
      return false;   
  } catch (error) {
    console.log(error);
    return false;
  }
}

function MultiSend(props) {

  // eslint-disable-next-line react/prop-types
  const { provider, ethers } = props;

  const [tokenAddress, setTokenAddress] = useState('0x1dDdB8Cfe8D964D6fA871CD748Aa3b5a58196f21');
  const [addresesWithAmounts, setAddresesWithAmounts] = useState('');  
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false); 
  const [addresses, setAddresses] = useState([]);
  const [amounts, setAmounts] = useState([]);

  const removePopup = () => {
    setShowPopup(false);
  };
  
  const resetMultisendPanel = () => {
    setTokenAddress('');
    setAddresesWithAmounts('');    
  };  

  const preparingMultisendProgress = async () => {
    const signer = provider.getSigner();
    const isTokenContract = await checkTokenContractValid(
        ethers, signer, StandardTokenContract.abi, tokenAddress);      
    if(isTokenContract) {
      if(checkValidAddressesAndAmount(addresesWithAmounts)) {        
        setShowPopup(true);
        return;
      }
      else {
        toast.error('Invalid addresses-amounts!');
        return;
      }      
    }
    else {
      toast.error('Invalid token address');
      return;
    }       
  };

const sendMultiReceiversWithAmount = async () => {
  setShowPopup(false);  
  setIsLoading(true);
  const signer = provider.getSigner();
  let multisendExecuting = await executingMultisend(
    ethers, signer, MultiSendContract.abi, 
    import.meta.env.VITE_MULTISEND_CONTRACT, 
    tokenAddress, addresses, amounts
  );
  setIsLoading(false);    
};

  return (
    <div className="multisend-token-container">
      {isLoading && <div className="loading">Sending...</div>}
      <h2>Token MultiSender Tool</h2>
      <hr style={{ marginBottom: 0 }} />
      <label className="label">Token Address:</label>
        <input 
          className="text-input-token" 
          type="text"
          value={tokenAddress}
          onChange={(e) => setTokenAddress(e.target.value)}
          placeholder="Enter your token addres here"/>      
      <label className="label">Addresses with Amounts:</label>
      <div className="text-input-multi-container">        
        <textarea
          className="text-input-multi"
          id="addressesWithAmount"
          value={addresesWithAmounts}
          onChange={(e) => setAddresesWithAmounts(e.target.value)}
          placeholder="Addresses and amounts are separated by commas. Example:
0xb5422FBF3Fe4a144838F13dD0100c32A6497C222,100
0xb5422FBF3Fe4a144838F13dD0100c32A6497C223,200
0xb5422FBF3Fe4a144838F13dD0100c32A6497C224,300
0xb5422FBF3Fe4a144838F13dD0100c32A6497C225,400
0xb5422FBF3Fe4a144838F13dD0100c32A6497C226,500
          "
        />      
      </div>
      <button 
        className="request-button"
        onClick={preparingMultisendProgress}>
          Next Step
      </button>      
    </div>
  );
}

export default MultiSend;


