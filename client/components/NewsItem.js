import React, { Component} from "react";

class NewsItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <li className={this.props.className}>
        {this.props.article.headline} (<a href={this.props.article.url} target="_blank">{this.props.article.source}</a>)
      </li>
    )
  }
}

export default NewsItem;