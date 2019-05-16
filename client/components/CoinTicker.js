import React, { Component} from "react";

class CoinTicker extends Component {
  constructor(props) {
    super(props);
    // const coinName = this.props.coinName;
    // const price = this.props.price;
    // const qty = this.props.qty;
    
  }
  render() {
    const { coinName, price, qty } = this.props;
    const holdings = qty ?
                     <li className="coininfo"> 
                       Your Holdings: <strong>{!qty || qty >= 1 ? qty : '0' + qty} {coinName.toUpperCase()}</strong>
                       <div>USD Value: <strong>${(qty * price).toFixed(2)}</strong></div>
                     </li>
                     : '';
    const info = <li className="coininfo" id={coinName}>
                  USD / {coinName} : <br></br> 
                  <span><strong>{price}</strong></span>
                 </li>
    
    return(
      <div id="coin_container">
        {info}
        {holdings}        
      </div>
    )
  }
}

export default CoinTicker;