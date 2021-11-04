import React, { Component, useState } from "react";
import { HashRouter, Route } from "react-router-dom";
import "./App.css";
import Web3 from "web3";
import DARKSO from "../abis/DARKSO.json";
import DARKSONFT from "../abis/DARKSO_NFT.json";

import Navbar from "./Navbar/Navbar";
import Dashboard from "./Dashboard/Dashboard";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      accountAddress: "",
      accountBalance: "",
      DarksoNFTContract: null,
      darksoNFTCount: 0,
      recentSoldNFTs: [],
      loading: true,
      metamaskConnected: false,
      contractDetected: false,
      totalTokensMinted: 0,
      totalTokensOwnedByAccount: 0,
      
      totalSale : 0,
      totalVolumn : 0,
      averagePrice : 0
    };
  }

  componentWillMount = async () => {
    await this.loadWeb3();
    await this.loadBlockchainData();
    //await this.setMetaData();
  };

  
  loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  loadBlockchainData = async () => {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    if (accounts.length === 0) {
      this.setState({ metamaskConnected: false });
    } else {
      this.setState({ metamaskConnected: true });
      this.setState({ loading: true });
      this.setState({ accountAddress: accounts[0] });
      let accountBalance = await web3.eth.getBalance(accounts[0]);
      accountBalance = web3.utils.fromWei(accountBalance, "Ether");
      this.setState({ accountBalance });
      this.setState({ loading: false });
      const networkId = await web3.eth.net.getId();
      const networkData = DARKSONFT.networks[networkId];
      if (networkData) {
        this.setState({ loading: true });
        const DarksoNFTContract = web3.eth.Contract(
          DARKSONFT.abi,
          networkData.address
        );

        this.setState({ DarksoNFTContract });
        this.setState({ contractDetected: true });
        
        //this.setState({ darksoNFTCount });
        // for (var i = 1; i <= darksoNFTCount; i++) {
        //   const cryptoBoy = await DarksoNFTContract.methods
        //     .alldarksoNFT(i)
        //     .call();
        //   this.setState({
        //     darksoNFT: [...this.state.darksoNFT, cryptoBoy],
        //   });
        // }
        
        this.setState({ loading: false });
      } else {
        this.setState({ contractDetected: false });
      }
    }
  };

  connectToMetamask = async () => {
    await window.ethereum.enable();
    this.setState({ metamaskConnected: true });
    window.location.reload();
  };

  // setMetaData = async () => {
  //   if (this.state.darksoNFT.length !== 0) {
  //     this.state.darksoNFT.map(async (cryptoboy) => {
  //       const result = await fetch(cryptoboy.tokenURI);
  //       const metaData = await result.json();
  //       this.setState({
  //         darksoNFT: this.state.darksoNFT.map((cryptoboy) =>
  //           cryptoboy.tokenId.toNumber() === Number(metaData.tokenId)
  //             ? {
  //                 ...cryptoboy,
  //                 metaData,
  //               }
  //             : cryptoboy
  //         ),
  //       });
  //     });
  //   }
  // };


  render() {
    return (
      <div className="">
        <HashRouter basename="/">
          <Navbar connectToMetamask={this.connectToMetamask} isConnected={this.state.metamaskConnected}/>
           <Route
            path="/"
            exact
            render={() => (
              <Dashboard
                totalSale = {this.state.totalSale}
                totalVolumn = {this.state.totalVolumn}
                averagePrice = {this.state.averagePrice}
                recentSoldNFT = {this.state.recentSoldNFTs}
              />
            )}
          />
          {/*
          <Route
            path="/mint"
            render={() => (
              <FormAndPreview
                mintMyNFT={this.mintMyNFT}
                nameIsUsed={this.state.nameIsUsed}
                colorIsUsed={this.state.colorIsUsed}
                colorsUsed={this.state.colorsUsed}
                setMintBtnTimer={this.setMintBtnTimer}
              />
            )}
          />
          <Route
            path="/marketplace"
            render={() => (
              <AlldarksoNFT
                accountAddress={this.state.accountAddress}
                darksoNFT={this.state.darksoNFT}
                totalTokensMinted={this.state.totalTokensMinted}
                changeTokenPrice={this.changeTokenPrice}
                toggleForSale={this.toggleForSale}
                buyCryptoBoy={this.buyCryptoBoy}
              />
            )}
          />
          <Route
            path="/my-tokens"
            render={() => (
              <MydarksoNFT
                accountAddress={this.state.accountAddress}
                darksoNFT={this.state.darksoNFT}
                totalTokensOwnedByAccount={
                  this.state.totalTokensOwnedByAccount
                }
              />
            )}
          />
          <Route
            path="/queries"
            render={() => (
              <Queries DarksoNFTContract={this.state.DarksoNFTContract} />
            )}
          /> */}
        </HashRouter>
          
      </div>
    );
  }
}

export default App;
