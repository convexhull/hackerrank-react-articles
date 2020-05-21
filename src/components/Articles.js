import React from 'react';

class Articles extends React.Component {


  state = {
    articles: [],
    author : '',
    fetched: false
  }


  onInputFieldChange = (event) => {
    this.setState({
      author: event.target.value
    })
  }

  onFetchArticles = async () => {
    let url = `https://jsonmock.hackerrank.com/api/articles?author=${this.state.author}&page=1`;
    let response = await fetch(url);
    console.log(response);
    if(response.ok){
      let data = await response.json();
      let articles = data.data;
      let filteredArticles = articles.filter((element) => element.title!==null).slice(0,3);
      this.setState({articles: filteredArticles, fetched: true});
    } 
  }

  render() {

    let articles = null;

    if(this.state.fetched) {
      if(this.state.articles.length){
        articles = this.state.articles.map( (article) => <li data-testid="result-row" key={article.title}>{article.title}</li>);
      }
      else {
        articles = null;
      }
    }

  
    return (
      <React.Fragment>
        <div className="controls">
          <div className="input-container">
            <span>author:</span>
            <input type="text" className="text-input" data-testid="text-input" value={this.state.author} onChange={this.onInputFieldChange} />
            <button className="fetch-button" data-testid="fetch-button" onClick={this.onFetchArticles} >Fetch</button>
          </div>
        </div>
       
        <div className="results">
          {articles}
        </div>
        {this.state.fetched && !this.state.articles.length ? <div data-testid="no-results">No results</div> : null}
      </React.Fragment>
    );
  }
}

export default Articles;
