import React, { Component } from 'react';
import axios from 'axios';
import NewSingle from './NewSingle';
import Error from './Error';

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [],
      error: false
    };
  }

  componentDidMount() {
    const url = `https://newsapi.org/v2/${this.props.news.type}?${this.props.news.query}&apiKey=66cc387297fd40a1a8bc592cb3e80a7e`;
    axios.get(url)
      .then((response) => {
        this.setState({
          news: response.data.articles
        })
      }).catch((error) => {
        this.setState({
          error: true
        })
      });
    // fetch(url)
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((data) => {
    //     this.setState({
    //       news: data.articles
    //     })
    //   })
      
  }

  renderItems() {
    if (!this.state.error) {
      return this.state.news.map((item) => (
        <NewSingle key={item.url} item={item} />
      ));
    } else {
      return <Error />
    }
  }

  render() {
    return (
      <div className="row">
        {this.renderItems()}
      </div>
    );
  }
}

export default News;
