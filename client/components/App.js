import React, { Component} from "react";
import NewsItem from './NewsItem.js';
import CoinTicker from './Cointicker.js';
import Cookies from "js-cookie";

import {hot} from "react-hot-loader";
import "./style.css";

class App extends Component{
  constructor() {
    super(); 
    this.initialState = { coinList: ['btcusd', 'ethusd', 'ltcusd', 'xrpusd'], username: Cookies.get('username') ? Cookies.get('username') : '' };
    for (let coin of this.initialState.coinList) this.initialState[coin] = { display: false, qty: 0 };
    this.state = this.initialState;
    
    this.fetchCoinPrice = this.fetchCoinPrice.bind(this);
    this.fetchNews = this.fetchNews.bind(this);
    this.toggleCoinVisibility = this.toggleCoinVisibility.bind(this);
    this.addPortfolio = this.addPortfolio.bind(this);
    this.createUser = this.createUser.bind(this);
    this.logInUser = this.logInUser.bind(this);
    this.logOutUser = this.logOutUser.bind(this);
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

  addPortfolio(e) {
    e.preventDefault();

    const stateCopy = JSON.parse(JSON.stringify(this.state));
    const coinChoice = document.querySelector('#coinSelect').value, coinQty = document.querySelector('#coinQty').value;
    stateCopy[coinChoice].qty = coinQty;

    fetch('/addportfolio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(stateCopy),
    });

    this.setState(stateCopy);
  }
  
  logInUser(e) {
    e.preventDefault();
    const stateCopy = JSON.parse(JSON.stringify(this.state));
    const username = document.querySelector('#logInUser').value, password = document.querySelector('#logInPw').value;
   
    const userData = { 
      username: username,
      password: password,
    };

    fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    })
    .then((res) => res.json())
    .then((res) => {
      if (res === 'validated') console.log('yay, you really are ', username);
      stateCopy.username = username;
      this.setState(stateCopy);
    });
  }
  
  logOutUser(e) {
    e.preventDefault();
    Cookies.remove('validated');
    // Cookies.remove('username');

    const stateCopy = JSON.parse(JSON.stringify(this.state));
    for (let property in this.state) {
      if (this.state[property].intervalId) {
        clearInterval(this.state[property].intervalId);
        delete this.state[property].intervalId;
      }
    }
    this.setState(this.initialState);
  }

  createUser(e) {
    e.preventDefault();
    // const stateCopy = JSON.parse(JSON.stringify(this.state));
    const username = document.querySelector('#signUpUser').value, password = document.querySelector('#signUpPw').value;
    const newUserData = { 
      username: username,
      password: password,
      portfolio: {
        btc: this.state.btcusd,
        eth: this.state.ethusd,
        ltc: this.state.ltcusd,
        xrp: this.state.xrpusd,
      },
    };

    fetch('/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUserData),
    });
    this.forceUpdate();

  }

  componentDidMount() {
    this.fetchNews();
    // fetch('/getportfolio')
    //   .then(res => res.json())
    //   .then((err, res) => {
    //     if (err) return res.json(JSON.stringify(err));
    //     const portfolio = res;
    //     this.setState(portfolio);
    //   });
  }

  render(){
    // Conditionally assemble array of "Coin" price components
    const conditionalCoinData = this.state.coinList.map(coin => {
      return this.state[coin] && this.state[coin].display && this.state[coin].data ? this.state[coin] : ''
    });
    let totalPortfolio = 0;
    const coinComponentArr = 
      conditionalCoinData
      .filter(coinInfo => coinInfo.display)
      .map(coinInfo => {
        totalPortfolio += coinInfo.qty * coinInfo.data.amount;
        return <CoinTicker coinName={coinInfo.data.base} price={coinInfo.data.amount} qty={coinInfo.qty}/>
      });
    totalPortfolio = totalPortfolio
      ? 
      <div id="totalportfolio"> Total Holdings is <br></br> ${totalPortfolio.toFixed(2)} </div>
      : '';

    // Create array of "NewsItem" components
    const newsItemArr = [];
    if (this.state.newsData) this.state.newsData.forEach((article, ind) => newsItemArr.push(<NewsItem className="newsitem" article={this.state.newsData[ind]}/>));

    // Create array of coin-displaying buttons
    const coinButtonArr = this.state.coinList.map(coin => {
      return (<button className="coinbutton" onClick={() => this.toggleCoinVisibility(coin)}>
                {coin.slice(0, 3).toUpperCase()}
              </button>)});

    // Create validation area elements
    if (this.state.username) var user = this.state.username;
    const validationElements = (Cookies.get('validated') !== 'true')
    ? 
      <section id="login_form">
        <form>
          <input id="logInUser" type="text" placeholder="username"></input>
          <input id="logInPw" type="password" placeholder="password"></input>
          <button onClick={this.logInUser}>Log In</button>
        </form>
        <form>
          <input id="signUpUser" type="text" placeholder="username"></input>
          <input id="signUpPw" type="password" placeholder="password"></input>
          <button onClick={this.createUser}>Sign Up</button>
        </form>
        <button id="login_form" onClick={this.logOutUser}>
          Clear Data
        </button>
      </section>
    : 
      <section id="login_form">
        <div id="greeting">Hi, {user}!</div>
        <button onClick={this.logOutUser}>
          Log Out
        </button>
      </section>

    return(
      <div className="App">

        <header id="header">
          <h1> YACHT </h1>
          <h2> yet another crypto-holdings tracker</h2>
          <img id="logo" src="./build/7c6b2619c84da1d88aab58c46e317c07.png"></img><br></br>
        </header>

        {validationElements}
        
        <section id="coinbutton_container">
          {coinButtonArr}
        </section>

        <section id="prices_container">
            <ul>
              {coinComponentArr}
              {totalPortfolio}
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
          <form>
            <label>Choose a coin to add to portfolio:<br></br>
              <select id="coinSelect">
                  <option value="btcusd">BTC</option>
                  <option value="ethusd">ETH</option>
                  <option value="ltcusd">LTC</option>
                  <option value="xrpusd">XRP</option>
              </select>
            <input id="coinQty" type="text"></input>
            <button onClick={this.addPortfolio}>Add Coins</button>
            </label>
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