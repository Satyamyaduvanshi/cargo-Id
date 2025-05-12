import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeroPage from "./pages/heroPage";
import ManufacturePage from "./pages/manufacturePage";
import VerifyPage from "./pages/verifyPage";
import UpdatePage from "./pages/updatePage";
import { Navigate } from "react-router-dom";
import TruckScene from "./components/TruckScene";
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { clusterApiUrl } from '@solana/web3.js';
import '@solana/wallet-adapter-react-ui/styles.css';
import { RoleProvider } from './context/RoleContext';
import Navbar from "./components/NavBar";

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
