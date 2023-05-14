import { useState, useEffect } from 'react';
import FaucetPage from './components/Faucet/Faucet';
import CreateTokenPage from './components/CreateToken/CreateToken';
import MultiSendPage from './components/MultiSend/MultiSend';
import './App.css';
import { toast } from 'react-toastify';
import { useAccount, useBalance } from "wagmi";
import { ConnectButton } from '@rainbow-me/rainbowkit';

function App() {
  const [activeMenu, setActiveMenu] = useState('faucet');   
  const [showAddEthermintNetwork, setShowAddEthermintNetwork] = useState(true);
  const { address } = useAccount();
  const { data } = useBalance({ address: address });

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
      toast.error('MetaMask is not installed!', {
        position: toast.POSITION.TOP_RIGHT,
      });      
      return;
    }    
    try {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [ETHERMINT_NETWORK],
      });
      toast.success('Connect Ethermint Custom Chain Success!', {
        position: toast.POSITION.TOP_RIGHT,
      });      
    } catch (error) {
      toast.error('Cannot connect to Ethermint Custom Chain!', {
        position: toast.POSITION.TOP_RIGHT,
      }); 
    }
  };  

  const renderContent = () => {
    switch (activeMenu) {
      case 'faucet':
        return <FaucetPage />;
      case 'createToken':
        return <CreateTokenPage />;
      case 'multiSend':
        return <MultiSendPage />;
      default:
        return null;
    }
  };

  useEffect(() => {    
    if (window.ethereum === undefined || 
      parseInt(window.ethereum?.networkVersion) === ETHERMINT_NETWORK.id) {
        setShowAddEthermintNetwork(false);
    }
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
          {/* <li className="connect-button-container">
            <ConnectButton />
          </li>                  */}
        </ul>
      </nav>
      <div className="content">{renderContent()}</div>
    </div>
  );
}

export default App;