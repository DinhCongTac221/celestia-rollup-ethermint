import "./CreateToken.css";
import React from 'react';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import StandardTokenArfiact from "../../abi/StandardToken.json";
import { faWallet, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

async function executingDeployContract(ethers, signer, abi, bytecode, name, symbol, supply) {
  try {    
    const contractFactory = new ethers.ContractFactory(abi, bytecode, signer);   
    const contract = await contractFactory.deploy(name, symbol, supply);    
    await contract.deployed();    
    return contract.address;
  } catch (error) {
    console.log(error);
    toast.error('Error deploying contract!');
    return;
  }
}

function CreateToken(props) {

  // eslint-disable-next-line react/prop-types
  const { provider, ethers } = props;

  const [nameToken, setNameToken] = useState('');
  const [symbolToken, setSymbolToken] = useState('');
  const [supplyToken, setSupplyToken] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showDeployedToken, setShowDeployedToken] = useState(false);
  const [deployedTokenAddress, setDeployedTokenAddress] = useState('');

  const removePopup = () => {
    setShowPopup(false);
  };
  
  const removeDeployedToken = () => {
    setNameToken('');
    setSymbolToken('');
    setSupplyToken(1);
    setShowDeployedToken(false);
  };

  const handleAddToken = async () => {    
    await addTokenToMetamask(deployedTokenAddress, symbolToken.toUpperCase(), 18);
  };

  async function addTokenToMetamask(tokenAddress, tokenSymbol, tokenDecimals) {
    // Kiểm tra xem Metamask có được cung cấp không
    if (window.ethereum && window.ethereum.isMetaMask) {
      try {
        const tokenList = await provider.send('wallet_watchAsset', {
          type: 'ERC20',
          options: {
            address: tokenAddress,
            symbol: tokenSymbol,
            decimals: tokenDecimals,           
          },
        });        
        if (tokenList) {
          toast.success('Token added to Metamask');
        } else {
          toast.error('Token not added to Metamask');
        }
      } catch (error) {
        toast.error('Error adding token to Metamask');
      }
    } else {
      console.error('Metamask is not available');
    }
  }

  const preparingDeployTokenContract = (event) => {
    event.preventDefault();    
    if (isNaN(supplyToken)) {      
      toast.error('Invalid supply amount');
      return;
    }
    if(!nameToken) {
      toast.error('Invalid name of token');
      return;
    }
    if(!symbolToken) {
      toast.error('Invalid symbol of token');
      return;
    }
    setShowPopup(true);
  };

const deployTokenContract = async () => {
  setShowPopup(false);
  let totalSupply = parseInt(supplyToken, 10);   
  const signer = provider.getSigner();
  setIsLoading(true);
  let deployAddress = await executingDeployContract(
    ethers,
    signer, 
    StandardTokenArfiact.abi, 
    StandardTokenArfiact.bytecode,
    nameToken,
    symbolToken.toUpperCase(),
    totalSupply
  );
  setIsLoading(false);
  if(deployAddress) {
    toast.success('Deploy Token Successful!');
    setDeployedTokenAddress(deployAddress);
    setShowDeployedToken(true);    
  }   
};

  return (
    <div className="create-token-container">
      {isLoading && <div className="loading">Deploying...</div>}
      <h2>Please fill in the information for your coin
        <br />
        and then select "Deploy Token Contract"
      </h2>
      <hr style={{ marginBottom: 0 }} />
      <div className="input-group">
        <label htmlFor="coinName" className="label-left">Name of token:</label>
        <input 
          className="text-input" 
          type="text"
          value={nameToken}
          onChange={(e) => setNameToken(e.target.value)}
          placeholder="Enter your name"/>
      </div>
      <div className="input-group">
        <label htmlFor="coinSymbol" className="label-left">Symbol of token:</label>
        <input 
          className="text-input" 
          type="text"
          value={symbolToken}
          onChange={(e) => setSymbolToken(e.target.value)}
          placeholder="Enter your symbol"/>        
      </div>
      <div className="input-group">
        <label htmlFor="coinSupply" className="label-left">Total Supply of token:</label>
        <input 
          className="text-input" 
          pattern="[0-9]*" 
          inputMode="numeric" 
          value={supplyToken}
          onChange={(e) => setSupplyToken(e.target.value)}
          placeholder="number"/>
      </div>
      <button 
        className="request-button"
        onClick={preparingDeployTokenContract}>
          Deploy Token Contract
      </button>
      {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>Confirmation</h2>
                        <p> Are you sure you want to deploy your token with params:<br/>- Token Name = '{nameToken}'' <br/>- Token Symbol = '{symbolToken.toUpperCase()}'' <br/>- Total Supply = {supplyToken} ?
                        </p>
                        <div className="button-container">
                            <button onClick={removePopup}>Cancel</button>
                            <button onClick={deployTokenContract}>Yes</button>
                        </div>
                    </div>
                </div>
            )}      
      {showDeployedToken && (
                <div style={walletStyle}>
                    <p style={addressStyle}>Deployment success! Your Token Address: {deployedTokenAddress}</p>
                    <button style={buttonStyle} onClick={handleAddToken}>
                        <FontAwesomeIcon icon={faWallet} style={{ marginRight: "10px" }} />
                        Add To Metamask
                    </button>
                    <button style={buttonStyle} onClick={removeDeployedToken}>
                        <FontAwesomeIcon icon={faTimes} style={{ marginRight: "10px" }} />
                        Close Panel
                    </button>
                </div>
            )}
    </div>
  );
}

const walletStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  borderRadius: "5px",
};

const addressStyle = {
  textAlign: "center",
  borderRadius: "5px",
  color: "#FF3300", // set the text color to white
  fontSize: 18,
  fontWeight: "bold",
  padding: "10px", // add padding to the container for spacing
};

const buttonStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "20px",
  padding: "20px",
  backgroundColor: "#FFFFFF",
  color: "#4caf50",
  borderRadius: "5px",
  border: "none",
  cursor: "pointer",
  transition: "all 0.2s ease-in-out",
  boxShadow: "0 0 0 rgba(0, 0, 0, 0)",  
};

export default CreateToken;


