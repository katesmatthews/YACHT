import React, { Component} from "react";
import NewsItem from './NewsItem.js';
import CoinTicker from './Cointicker.js';

import {hot} from "react-hot-loader";
import "./style.css";

class App extends Component{
  constructor() {
    super();  
    this.state = { coinList: ['btcusd', 'ethusd', 'ltcusd', 'xrpusd'] };
    for (let coin of this.state.coinList) this.state[coin] = { display: false };
    
    this.fetchCoinPrice = this.fetchCoinPrice.bind(this);
    this.fetchNews = this.fetchNews.bind(this);
    this.toggleCoinVisibility = this.toggleCoinVisibility.bind(this);
  }


  fetchCoinPrice(coin) {
    const coinAbbrev = coin.slice(0, 3);
    fetch(`https://api.coinbase.com/v2/prices/${coinAbbrev}-USD/buy`)
      .then((res) => res.json())
      .then((res) => {
        // update state ONLY if we either have no data, or the price is unchanged
        if (!this.state[coin].data || this.state[coin].data.amount !== res.data.amount) {
          const newState = {};
          newState[coin] = {
            data: res.data,
            display: true,
            intervalId: this.state[coin].intervalId,
            qty: this.state[coin].qty,
          };
          this.setState(newState);
        }
      });
    }

  fetchNews() {
    fetch('https://newsapi.org/v2/everything?q=bitcoin&apiKey=2db8b37f71e5488aab951bd6d8953207')
      .then((res) => res.json())
      .then((res) => {
        let newsData = res.articles.slice(0,8);
        newsData = newsData.map(article => {
          return {
            source: article.source.name,
            headline: article.title,
            url: article.url,
            time: article.publishedAt,
            fullArticle: article.content,
          };
        });
        this.setState({newsData: newsData});
    });
  }

  toggleCoinVisibility(coin) {
    const coinClone = JSON.parse(JSON.stringify(this.state[coin]));
    
    if (!coinClone.display) {
      this.fetchCoinPrice(coin)
      coinClone.intervalId = setInterval(() => this.fetchCoinPrice(coin), 5000);
      coinClone.display = !coinClone.display;
    } else {
      clearInterval(coinClone.intervalId);
      delete coinClone.intervalId;
      coinClone.display = !coinClone.display;
    }

    const newCoinState = {};
    newCoinState[coin] = coinClone;
    this.setState(newCoinState);
  }

  componentDidMount() {
    this.fetchNews();
  }
  

  render(){
    // Conditionally assemble array of "Coin" price components
    const conditionalCoinData = this.state.coinList.map(coin => {
      return this.state[coin] && this.state[coin].display && this.state[coin].data ? this.state[coin] : ''
    });
    const coinComponentArr = 
      conditionalCoinData
      .filter(coinInfo => coinInfo.display)
      .map(coinInfo => <CoinTicker coinName={coinInfo.data.base} price={coinInfo.data.amount} />);

    // Create array of "NewsItem" components
    const newsItemArr = [];
    if (this.state.newsData) this.state.newsData.forEach((article, ind) => newsItemArr.push(<NewsItem className="newsitem" article={this.state.newsData[ind]}/>));

    // Create array of coin-displaying buttons
    const coinButtonArr = this.state.coinList.map(coin => {
      return (<button className="coinbutton" onClick={() => this.toggleCoinVisibility(coin)}>
                {coin.slice(0, 3).toUpperCase()}
              </button>)});


    return(
      <div className="App">

        <header id="header">
          <h1> YACHT </h1>
          <h2> yet another crypto-holdings tracker</h2>
          <img id="logo" src="./build/7c6b2619c84da1d88aab58c46e317c07.png"></img><br></br>
        </header>

        <section id="coinbutton_container">
          {coinButtonArr}
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

        <section id="add_portfolio">
          <form method="POST" action="/addportfolio">        
            <label htmlFor="coin-select">Choose a coin to add to portfolio:<br></br></label>
            <select name="selectedcoin">
                <option value="btc">BTC</option>
                <option value="eth">ETH</option>
                <option value="ltc">LTC</option>
                <option value="xrp">XRP</option>
            </select>
            <input name="coinqty" type="text"></input>
            <input type="submit" value="Add Coins"></input>
          </form>
        </section>

        <section id="login_form">
          <form method="POST" action="/login">
            <input name="username" type="text" placeholder="username"></input>
            <input name="password" type="password" placeholder="password"></input>
            <input type='submit' value="Log In"></input>
          </form>
          <form method="POST" action="/signup">
            <input name="username" type="text" placeholder="username"></input>
            <input name="password" type="password" placeholder="password"></input>
            <input type="submit" value="Sign Up"></input>
          </form>
        </section>
        
      </div>
    );
  }
}

// powered by News API
// const util = require('util');
// import ContentEditable from "react-contenteditable";


export default hot(module)(App);