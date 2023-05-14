import "./polyfills";
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { 
  chain, 
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import { injectedWallet, metaMaskWallet } from '@rainbow-me/rainbowkit/wallets';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';

/* Ethermint Testnet */
const ethermint = {
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

const { chains, provider } = configureChains( 
  [ethermint],
  [jsonRpcProvider({
    rpc: (chain) => ({
      http: import.meta.env.VITE_RPC_ETHERMINT,
    }),
  })]
);

const connectors = connectorsForWallets([
  {
    groupName: 'Wallets List',
    wallets: [
      metaMaskWallet({ chains }),
      injectedWallet({ chains }),
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
});

const containerStyle = {
  width: '800px',
  margin: '0 auto'
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider chains={chains}>
      <div style={containerStyle}>
        <App />
      </div>
    </RainbowKitProvider>
  </WagmiConfig>
);