import React, { Component} from "react";
import {hot} from "react-hot-loader";
import "./style.css";
// const NewsAPI = require('newsapi');
// const newsapi = new NewsAPI('2db8b37f71e5488aab951bd6d8953207');
// import "/Users/katematthews/Coding/YACHT/client/assets/yacht-img.png";

class App extends Component{
  constructor() {
    super();  
    this.state = {
      currencyPairs: [],
    };
  }

  componentDidMount() {
    // Get BTC-USD price
    fetch('https://api.coinbase.com/v2/prices/BTC-USD/buy')
      .then((res) => res.json())
      .then((res) => {this.setState({currencyPairs: { btcusd: res } });});
    // Get ETH-USD price
    fetch('https://api.coinbase.com/v2/prices/ETH-USD/buy')
      .then((res) => res.json())
      .then((res) => {this.setState({currencyPairs: { ethusd: res } });});
    // Get LTC-USD price
    fetch('https://api.coinbase.com/v2/prices/LTC-USD/buy')
      .then((res) => res.json())
      .then((res) => {this.setState({currencyPairs: { ltcusd: res } });});    

    // Get Bitcoin-related news
    fetch('https://newsapi.org/v2/everything?q=bitcoin&apiKey=2db8b37f71e5488aab951bd6d8953207')
      .then((res) => res.json())
      .then((res) => {
      
    });
  }

  render(){
    console.log('state in render() is ', this.state);
    const btcusdAmount = this.state.currencyPairs.btcusd ? this.state.currencyPairs.btcusd.data.amount : '';
    const ethusdAmount = this.state.currencyPairs.ethusd ? this.state.currencyPairs.ethusd.data.amount : '';
    const ltcusdAmount = this.state.currencyPairs.ltcusd ? this.state.currencyPairs.ltcusd.data.amount : '';
    const xrpusdAmount = this.state.currencyPairs.xrpusd ? this.state.currencyPairs.xrpusd.data.amount : '';

    return(
      <div className="App">
        <h1> YACHT </h1>
        <img id="logo" src="./build/7c6b2619c84da1d88aab58c46e317c07.png"></img><br></br>


        <button className="coins">BTC</button>
        <button className="coins">ETH</button>
        <button className="coins">LTC</button>
        <button className="coins">XRP</button>
        <br></br>
        <br></br>
        <br></br>
        BTC/USD: {btcusdAmount}<br></br>
        ETH/USD: {ethusdAmount}<br></br>
        LTC/USD: {ltcusdAmount}<br></br>
        XRP/USD: {xrpusdAmount}
      </div>
    );
  }
}
// powered by News API

export default hot(module)(App);