import React, { Component} from "react";
import NewsItem from './NewsItem.js';
import CoinTicker from './Cointicker.js';

import {hot} from "react-hot-loader";
import "./style.css";

class App extends Component{
  constructor() {
    super();  
    this.state = {
      btcusd : { display: true},
      ethusd : { display: true},
      ltcusd : { display: true},
      xrpusd : { display: true},
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

    // Get Bitcoin-related news
    fetch('https://newsapi.org/v2/everything?q=bitcoin&apiKey=2db8b37f71e5488aab951bd6d8953207')
      .then((res) => res.json())
      .then((res) => {
        let newsData = res.articles.slice(0,5);
        newsData = newsData.map(article => {
          return {
            source: article.source.name,
            headline: article.title,
            url: article.url,
            time: article.publishedAt,
            fullArticle: article.content,
          };
        });
        console.log('newsData in fetch news is ', newsData);
        this.setState({newsData: newsData});
    });
  }

  toggleCoinVisibility(coin) {
    const coinClone = JSON.parse(JSON.stringify(this.state[coin]));
    coinClone.display = !coinClone.display;

    const newCoinState = {};
    newCoinState[coin] = coinClone;
    this.setState(newCoinState);
  }

  render(){
    // Create array of "Coin" price components
    const btcusd = (this.state.btcusd && this.state.btcusd.display && this.state.btcusd.data) ? (this.state.btcusd) : '';
    const ethusd = (this.state.ethusd && this.state.ethusd.display && this.state.ethusd.data) ? (this.state.ethusd) : '';
    const ltcusd = (this.state.ltcusd && this.state.ltcusd.display && this.state.ltcusd.data) ? (this.state.ltcusd) : '';
    const xrpusd = (this.state.xrpusd && this.state.xrpusd.display && this.state.xrpusd.data) ? (this.state.xrpusd) : '';
    const coinComponentArr = [btcusd, ethusd, ltcusd, xrpusd]
      .filter(coinInfo => coinInfo.display)
      .map(coinInfo => <CoinTicker className="coinprice" coinName={coinInfo.data.base} price={coinInfo.data.amount} />);

      // console.log('coinComponentArr after building is ', coinComponentArr);

    // Create array of "NewsItem" components
    const newsItemArr = [];
    if (this.state.newsData) this.state.newsData.forEach((article, ind) => newsItemArr.push(<NewsItem className="newsitem" article={this.state.newsData[ind]}/>));

    return(
      <div className="App">
        <h1> YACHT </h1>
        <h2> yet another crypto-holdings tracker</h2>
        <img id="logo" src="./build/7c6b2619c84da1d88aab58c46e317c07.png"></img><br></br>

        <section id="coinbutton_container">
          <button className="coinbutton" onClick={() => this.toggleCoinVisibility('btcusd')}>BTC</button>
          <button className="coinbutton" onClick={() => this.toggleCoinVisibility('ethusd')}>ETH</button>
          <button className="coinbutton" onClick={() => this.toggleCoinVisibility('ltcusd')}>LTC</button>
          <button className="coinbutton" onClick={() => this.toggleCoinVisibility('xrpusd')}>XRP</button>
        </section>
        
        <section id="prices_container">
            <ul>
              {coinComponentArr}
            </ul>
        </section>

        <section id="news_container">
          <h3> 
            What's happening in the cryptosphere
          </h3>
          <ul id="news_list">
            {newsItemArr}
          </ul>
        </section>

        {/* INSERT LOGIN STUFF HERE */}
        {/* <button onClick=>Super Secret User Data</button> */}
        
      </div>
    );
  }
}



// powered by News API
// const util = require('util');
// import ContentEditable from "react-contenteditable";


export default hot(module)(App);