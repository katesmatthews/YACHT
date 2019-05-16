import React, { Component} from "react";

class CoinTicker extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <li className="coinprice" id={this.props.coinName}>
        USD / {this.props.coinName} : {this.props.price}
      </li>
    )
  }
}

export default CoinTicker;