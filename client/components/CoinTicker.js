import React, { Component} from "react";

class CoinTicker extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <li className={this.props.className}>
        {this.props.coinName} / USD : {this.props.price}
      </li>
    )
  }
}

export default CoinTicker;