import './App.css';
import { useState, useEffect } from 'react';
import FaucetPage from './components/Faucet/Faucet';
import CreateTokenPage from './components/CreateToken/CreateToken';
import MultiSendPage from './components/MultiSend/MultiSend';
import { useAccount } from "wagmi";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { ethers } from "ethers";

function App() {
  const [activeMenu, setActiveMenu] = useState('faucet');  
  const { address } = useAccount();

  const ETHERMINT_NETWORK = {
    id: 9000,
    name: 'Ethermint',
    network: 'ethermint',
    nativeCurrency: {
      decimals: 18,
      name: 'Ethermint',
      symbol: 'ETH',
    },
    rpcUrls: {
      default: {
        http: [import.meta.env.VITE_RPC_ETHERMINT],
      },
    },
    testnet: true,
  };

  const addEthermintNetwork = async () => {
    if (!window.ethereum || address === undefined) {
      toast.error('MetaMask is not installed!');      
      return;
    }    
    try {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [ETHERMINT_NETWORK],
      });
      toast.success('Connect Ethermint Custom Chain Success!');      
    } catch (error) {
      toast.error('Cannot connect to Ethermint Custom Chain!'); 
    }
  };  

  const renderContent = () => {
    switch (activeMenu) {
      case 'faucet':
        return <FaucetPage />;
      case 'createToken':
        return <CreateTokenPage 
          provider = {new ethers.providers.Web3Provider(window.ethereum)}
          ethers = {ethers}      
        />;
      case 'multiSend':
        return <MultiSendPage />;
      default:
        return null;
    }
  };

  useEffect(() => {    
  }, []);


  return (
    <div>
      <nav className="menu">
        <ul>
          <li>
            <button className={activeMenu === 'faucet' ? 'active' : ''} onClick={() => setActiveMenu('faucet')}>
              Faucet
            </button>
          </li>
          <li>
            <button className={activeMenu === 'createToken' ? 'active' : ''} onClick={() => setActiveMenu('createToken')}>
              Create Your Own Token
            </button>
          </li>
          <li>
            <button className={activeMenu === 'multiSend' ? 'active' : ''} onClick={() => setActiveMenu('multiSend')}>
              MultiSend Any Token
            </button>
          </li>
          {(
            <li className="connect-button-container">
              <ConnectButton onClick={addEthermintNetwork} />
            </li>
          )}          
        </ul>
      </nav>
      <div className="content">{renderContent()}</div>
      <div>
        <p className='copyright'>
          Copyright by 
          <a href='https://github.com/thinhpn' target='_blank' rel='noopener noreferrer'> allinlink#6932</a><br/>
          Made for Celestia Network with love!
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;