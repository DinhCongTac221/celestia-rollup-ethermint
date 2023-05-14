import { useState } from 'react';
import FaucetPage from './components/Faucet/Faucet';
import CreateTokenPage from './components/CreateToken/CreateToken';
import MultiSendPage from './components/MultiSend/MultiSend';
import './App.css';

function App() {
  const [activeMenu, setActiveMenu] = useState('faucet');

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
        </ul>
      </nav>
      <div className="content">{renderContent()}</div>
    </div>
  );
}

export default App;