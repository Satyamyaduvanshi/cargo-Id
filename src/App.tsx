import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeroPage from "./pages/heroPage";
import ManufacturePage from "./pages/manufacturePage";
import VerifyPage from "./pages/verifyPage";
import UpdatePage from "./pages/updatePage";
import TruckScene from "./components/TruckScene";
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { clusterApiUrl } from '@solana/web3.js';
import '@solana/wallet-adapter-react-ui/styles.css';
import { RoleProvider } from './context/RoleContext';
import Navbar from "./components/NavBar";

const NotFoundPage = () => (
  <div className="flex flex-col items-center justify-center h-screen px-4 text-center">
    <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
    <h2 className="text-4xl font-bold mb-6">Page Not Found</h2>
    <p className="text-xl mb-8">The page you're looking for doesn't exist or has been moved.</p>
    <a href="/home" className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors">
      Return Home
    </a>
  </div>
);

function App() {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = clusterApiUrl(network);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <RoleProvider>
            <Router>
              <div className="flex flex-col min-h-screen relative overflow-x-hidden">
                <div className="absolute inset-0 z-0 pointer-events-none">
                  <TruckScene />
                </div>
                <div className="relative z-10 flex flex-col flex-grow">
                  <Navbar />
                  <main className="flex-grow">
                    <Routes>
                      <Route path="/" element={<HeroPage />} />
                      <Route path="/register" element={<ManufacturePage />} />
                      <Route path="/verify" element={<VerifyPage />} />
                      <Route path="/update" element={<UpdatePage />} />
                      <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                  </main>
                </div>
              </div>
            </Router>
          </RoleProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
