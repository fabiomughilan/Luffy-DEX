import React from 'react'
import Eth from '../eth.svg'
import Logo from '../onepiece logo.png'
import { Link } from 'react-router-dom'

function Header(props) {
  const {  address, isConnected, connect } = props;
  return (
    <header>
      <div className="leftH">
        <img src={Logo} alt="logo" className="logo"/>
        <Link to ="/" className="link">
          <div className="headerItem">Swap</div>
        </Link>

        <Link to ="/tokens" className="link">
          <div className="headerItem">Tokens</div>
        </Link>
      </div>
      <div className="rightH">
        <div className="headerItem">
          <img src={Eth} alt="eth" className="eth"/>
          Ethereum
        </div>
        <div className="connectButton" onClick={connect}>
          {isConnected ? (address.slice(0, 4) + "..." + address.slice(-4)) : "Connect Wallet"}
        </div>
      </div>
    </header>
  )
}

export default Header