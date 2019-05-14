import React, { Component} from "react";
import {hot} from "react-hot-loader";
import "./style.css";

class App extends Component{
  constructor() {
    super();  
    this.state = {
      btcusd : { display: false},
      ethusd : { display: false},
      ltcusd : { display: false},
      xrpusd : { display: false},
    };
    this.fetchBTCUSD = this.fetchBTCUSD.bind(this);
    this.fetchETHUSD = this.fetchETHUSD.bind(this);
    this.fetchLTCUSD = this.fetchLTCUSD.bind(this);
    this.fetchXRPUSD = this.fetchXRPUSD.bind(this);
  }

  fetchBTCUSD() {
    // if (this.state.btcusd.display) {
      fetch('https://api.coinbase.com/v2/prices/BTC-USD/buy')
        .then((res) => res.json())
        .then((res) => {this.setState({ btcusd: {data : res.data } });});
    // }
  }
  fetchETHUSD() {
    // if (this.state.ethusd.display) {
    fetch('https://api.coinbase.com/v2/prices/ETH-USD/buy')
      .then((res) => res.json())
      .then((res) => {this.setState({ ethusd: {data : res.data }});});
    // }
  }
  fetchLTCUSD() {
    // if (this.state.ltcusd.display) {
    fetch('https://api.coinbase.com/v2/prices/LTC-USD/buy')
      .then((res) => res.json())
      .then((res) => {this.setState({ ltcusd: {data : res.data }});}); 
    // } 
  }
  fetchXRPUSD() { 
    // if (this.state.xrpusd.display) {
    fetch('https://api.coinbase.com/v2/prices/XRP-USD/buy')
      .then((res) => res.json())
      .then((res) => {this.setState({ xrpusd: {data : res.data }});});  
    // }  
  }

  componentDidMount() {
    this.fetchBTCUSD()
    this.fetchETHUSD()
    this.fetchLTCUSD()
    this.fetchXRPUSD() 
    // setInterval(this.fetchBTCUSD, 3000);
    // setInterval(this.fetchETHUSD, 3000);
    // setInterval(this.fetchLTCUSD, 3000);
    // setInterval(this.fetchXRPUSD, 3000);

    // Get Bitcoin-related news
    fetch('https://newsapi.org/v2/everything?q=bitcoin&apiKey=2db8b37f71e5488aab951bd6d8953207')
      .then((res) => res.json())
      .then((res) => {
    });
  }

  toggleCoin(coin) {
    const coinClone = JSON.parse(JSON.stringify(this.state[coin]));
    coinClone.display = !coinClone.display;

    const newCoinState = {};
    newCoinState[coin] = coinClone;
    this.setState(newCoinState);
  }

  render(){
    console.log('state in render() is ', this.state);


    let btcusdAmount = (this.state.btcusd && this.state.btcusd.display && this.state.btcusd.data.amount) ? ('BTC/USD: ' + this.state.btcusd.data.amount) : '';
    let ethusdAmount = (this.state.ethusd && this.state.ethusd.display && this.state.ethusd.data.amount) ? ('ETH/USD: ' + this.state.ethusd.data.amount) : '';
    let ltcusdAmount = (this.state.ltcusd && this.state.ltcusd.display && this.state.ltcusd.data.amount) ? ('LTC/USD: ' + this.state.ltcusd.data.amount) : '';
    let xrpusdAmount = (this.state.xrpusd && this.state.xrpusd.display && this.state.xrpusd.data.amount) ? ('XRP/USD: ' + this.state.xrpusd.data.amount) : '';

    return(
      <div className="App">
        <h1> YACHT </h1>
        <img id="logo" src="./build/7c6b2619c84da1d88aab58c46e317c07.png"></img><br></br>


        <section id="buttons">
          <button className="coins" onClick={() => this.toggleCoin('btcusd')}>BTC</button>
          <button className="coins" onClick={() => this.toggleCoin('ethusd')}>ETH</button>
          <button className="coins" onClick={() => this.toggleCoin('ltcusd')}>LTC</button>
          <button className="coins" onClick={() => this.toggleCoin('xrpusd')}>XRP</button>
        </section>
        <br></br>
        <section id="prices">
          <ul>
            <li>{btcusdAmount}</li>
            <li>{ethusdAmount}</li>
            <li>{ltcusdAmount}</li>
            <li>{xrpusdAmount}</li>
          </ul>          
        </section>
      </div>
    );
  }
}
// powered by News API

export default hot(module)(App);