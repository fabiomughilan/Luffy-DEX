import { useAccount, useConnect } from "wagmi";
import "./App.css";
import Header from "./components/Header";
import Swap from "./components/Swap";
import Token from "./components/Tokens";
import {Routes,Route} from "react-router-dom";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

function App() {
  const {address, isConnected} = useAccount();
  const {connect}=useConnect({
    connector: new MetaMaskConnector(),
  })
  return (
    <div className="App">
      <Header connect={connect} isConnected={isConnected} address={address} />
      <div className="mainWindow">
        <Routes>
          <Route path="/" element={<Swap isConnected={isConnected} address={address}/>} />
          <Route path="/tokens" element={<Token />} />
        </Routes>
      </div>
    <Footer><p>Developed by Fabio Mughilan</p></Footer>
    </div>
  )

}

export default App;
