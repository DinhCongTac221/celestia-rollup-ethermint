import { useState } from 'react';
import './Faucet.css';

function FaucetPage() {
  const [walletAddress, setWalletAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleRequest = async () => {
    setLoading(true);
    // Gọi API bên ngoài để thực hiện yêu cầu Faucet
    try {
      const response = await fetch('https://example.com/faucet', {
        method: 'POST',
        body: JSON.stringify({ walletAddress }),
      });

      if (response.ok) {
        setToastMessage('Faucet Successfully');
      } else {
        setToastMessage('Faucet Fail! Please try again later!');
      }
    } catch (error) {
      setToastMessage('Faucet Fail! Please try again later!');
    }

    setLoading(false);
  };

  return (
    <div className="faucet-container">
      <h1>Faucet Page</h1>
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
      {toastMessage && <div className={`toast ${toastMessage.includes('Fail') ? 'error' : 'success'}`}>{toastMessage}</div>}
    </div>
  );
}

export default FaucetPage;
