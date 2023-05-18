import "./MultiSend.css";
import React from 'react';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import MultiSendContract from "../../abi/MultiSend.json";
import StandardTokenContract from "../../abi/StandardToken.json";

function MultiSend(props) {

  // eslint-disable-next-line react/prop-types
  const { provider, ethers } = props;

  // const [tokenAddress, setTokenAddress] = useState('0x8a10a139D2717CE8882d99E5D9FeDA0F6129dD11');
  const [tokenAddress, setTokenAddress] = useState('');
  const [addresesWithAmounts, setAddresesWithAmounts] = useState('');  
  const [isSending, setIsSending] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [showPopup, setShowPopup] = useState(false); 
  const [showPopupSendSuccess, setShowPopupSendSuccess] = useState(false); 
  const [addresses, setAddresses] = useState([]);
  const [amounts, setAmounts] = useState([]);
  const [tokenName, setTokenName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [tokenSupply, setTokenSupply] = useState(0);
  const [tokenDecimal, setTokenDecimal] = useState(0);
  const [userBalance, setUserBalance] = useState(0);
  const [totalSpentAmount, setTotalSpentAmount] = useState(0);
  const [allowance, setAllowance] = useState(0);
  const [copyTransactionHash, setCopyTransactionHash] = useState(false);
  const [transactionHash, setTransactionHash] = useState('');

  const MULTISEND_CONTRACT = import.meta.env.VITE_MULTISEND_CONTRACT;

  //HELPER FUNCTIONS

  function convertToDecimal(number, decimal) {
    if(isNaN(number) || isNaN(decimal))
      return null;
    let stringDecimal = "";
    for (let index = 0; index < decimal; index++) {
      stringDecimal += "0";      
    }
    return String(number) + String(stringDecimal);
  }

  async function copyHashToClipboard() {
    try {
      await navigator.clipboard.writeText(transactionHash);
      setCopyTransactionHash(true);      
    } catch (err) {
        console.error("Failed to copy: ", err);
    }
  }

  async function executingMultisend(ethers, signer, abi, contract_address, token_address, toAddresses, amounts) {
    try {
      let convertAmounts = [];
      for (let index = 0; index < amounts.length; index++) {
        convertAmounts.push(convertToDecimal(amounts[index], tokenDecimal));
      }      
      const multisendContract = new ethers.Contract(contract_address, abi, signer);
      const tokenContract = new ethers.Contract(token_address, StandardTokenContract.abi, signer);      
      if(allowance < totalSpentAmount) {        
        const needApprove = await tokenContract.approve(MULTISEND_CONTRACT, convertToDecimal(totalSpentAmount, tokenDecimal));
        if(needApprove) {
          const sending = await multisendContract.multiSendFlexibleAmount(token_address, toAddresses, convertAmounts);
          if(sending.hash) {            
            setTransactionHash(sending.hash);            
            toast.success('Multisend token success!');
            setShowPopupSendSuccess(true);            
            return true;
          }
        }
      }
      else {
        const sending = await multisendContract.multiSendFlexibleAmount(token_address, toAddresses, amounts); 
        if(sending.hash) {          
          setTransactionHash(sending.hash);          
          toast.success('Multisend token success!');
          setShowPopupSendSuccess(true);          
          return true;
        }
      }
    } catch (error) {    
      toast.error('Error sending token!');
      return false;
    }
  }
  
  async function checkTokenContractValid(ethers, signer, abi, token_address) {
    try {
      // eslint-disable-next-line react/prop-types
      if(ethers.utils.isAddress(token_address)) {
        const tokenContract = new ethers.Contract(token_address, abi, signer);
        const sender = signer.getAddress();
        const [name, symbol, supply, decimals, balance, allowance] = await Promise.all([
          tokenContract.name(),
          tokenContract.symbol(),
          tokenContract.totalSupply(),
          tokenContract.decimals(),
          tokenContract.balanceOf(sender),
          tokenContract.allowance(sender, MULTISEND_CONTRACT),
        ]);        
        if(name && symbol && +supply > 0) {          
          setTokenName(name);
          setTokenSymbol(symbol);
          setTokenSupply(Math.round(ethers.utils.formatUnits(supply, decimals)));
          setTokenDecimal(decimals);
          setUserBalance(Math.round(ethers.utils.formatUnits(balance, decimals)));
          setAllowance(Math.round(ethers.utils.formatUnits(allowance, decimals)));
          return true;
        }          
        else
          return false;
      }
      else 
        return false;   
    } catch (error) {
      console.log(error);
      toast.error('Please connect wallet to ethermint network first!');      
    }
  }
  
  function checkValidAddressesAndAmount(ethers, addresesWithAmounts) {
    try {
        let lines = addresesWithAmounts.split('\n');
        let wallets = [];
        let numbers = [];
        let spentAmount = 0;
        for (let i = 0; i < lines.length; i++) {
          let [wallet, number] = lines[i].split(',');
          // eslint-disable-next-line react/prop-types
          if(!ethers.utils.isAddress(wallet.trim())) {
            toast.error(`wallet address: ${wallet.trim()} is invalid`);
            return false;
          }
          if(Number(number.trim()) <= 0) {
            toast.error(`tranfer amount: ${Number(number.trim())} is invalid`);
            return false;
          }
          wallets.push(wallet.trim());
          numbers.push(Number(number.trim()));
          spentAmount += Number(number.trim());
        }        
        setAddresses(wallets);
        setAmounts(numbers);
        setTotalSpentAmount(spentAmount);        
        if(userBalance < spentAmount) {
          toast.error(`Insufficient balance to perform the transfer. Please check your token balance again!`);
          return false;
        }        
        return true;   
    } catch (error) {
      console.log(error);      
      return false;
    }
  }

  //MAIN FUNCTIONS

  const removePopup = () => {
    setShowPopup(false);
  };

  const removePopupSendSuccess = () => {
    setShowPopupSendSuccess(false);
  };
  
  const resetMultisendPanel = () => {
    setTokenAddress('');
    setAddresesWithAmounts('');
    setTokenName('');
    setTokenSymbol('');
    setTokenSupply(0);
    setTokenDecimal(0);
    setTotalSpentAmount(0);
    setAllowance(0);    
    setCopyTransactionHash(false);  
  };  

  const preparingMultisendProgress = async () => {
    setIsChecking(true);
    try {
      const signer = provider.getSigner();
      const isTokenContract = await checkTokenContractValid(
          ethers, signer, StandardTokenContract.abi, tokenAddress);      
      if(isTokenContract) {
        if(checkValidAddressesAndAmount(ethers, addresesWithAmounts)) {  
          setIsChecking(false);      
          setShowPopup(true);        
          return;
        }
        else {
          setIsChecking(false);
          // toast.error('Invalid addresses-amounts!');
          return;
        }      
      }
      else {
        setIsChecking(false);
        toast.error('Invalid token address');      
        return;
      }       
    } catch (error) {
      console.log(error);      
    }
    
  };

  const sendMultiReceiversWithAmount = async () => {
    setShowPopup(false); 
    setIsSending(true);
    const signer = provider.getSigner();
    await executingMultisend(
      ethers, signer, MultiSendContract.abi, 
      MULTISEND_CONTRACT, tokenAddress, addresses, amounts
    );
    setIsSending(false); 
    resetMultisendPanel(); 
  };

  return (
    <div className="multisend-token-container">
      {isSending && <div className="loading">Sending...</div>}
      {isChecking && <div className="loading">Checking...</div>}
      <h2>Token MultiSender Tool</h2>
      <hr style={{ marginBottom: 0 }} />
      <label className="label">Token Address:</label>
      <input 
        className="text-input-token" 
        type="text"
        value={tokenAddress}
        onChange={(e) => setTokenAddress(e.target.value)}
        placeholder="Enter your token address here"/>
      {tokenName && tokenSymbol && tokenSupply > 0 && 
        <label className="label-valid-token">Token valid with name={tokenName}, symbol={tokenSymbol} & supply={tokenSupply}</label>}      
      <label className="label">Addresses with Amounts:</label>
      <div className="text-input-multi-container">        
        <textarea
          className="text-input-multi"
          id="addressesWithAmount"
          value={addresesWithAmounts}
          onChange={(e) => setAddresesWithAmounts(e.target.value)}
          placeholder="Addresses and amounts are separated by commas. Example:
0xb5422FBF3Fe4a144838F13dD0100c32A6497C222,100
0xa3cE26dA4B6C947396d97dc65Dc611f5cb9643A0,200
0xA2b6961864F85536EFb5006ba6BD40c440679faa,300
0xD2E4b1DB9fC5b184a887B2Af9AF780241720d3Fd,400
0x4663615a83748bB2bAB992A73B92cF9af94ae5Fc,500
          "
        />      
      </div>
      <button 
        className="request-button"
        onClick={preparingMultisendProgress}>
          Next Step
      </button>
      {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>Confirmation</h2>
                        <p> Everything looks good! Do you want to confirm that a total of {totalSpentAmount} token {tokenSymbol} will be transferred to {addresses.length} addresses?
                        </p>
                        <div className="button-container">
                            <button onClick={removePopup}>Cancel</button>
                            <button onClick={sendMultiReceiversWithAmount}>Yes</button>
                        </div>
                    </div>
                </div>
            )}
      {showPopupSendSuccess && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>Success</h2>
                        <p> Your multi-send request has been successfully executed with the transaction hash={transactionHash}
                        </p>
                        <div className="button-container">                            
                            <button onClick={copyHashToClipboard}>{copyTransactionHash ? "Copied!" : "Copy tx-hash"}</button>
                            <button onClick={removePopupSendSuccess}>Close</button>
                        </div>
                    </div>
                </div>
            )}       
    </div>
  );
}

export default MultiSend;


