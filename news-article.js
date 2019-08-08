class NewsArticle extends HTMLElement {
    set article(article) {
    this.innerHTML = `
      <a href="${article.url}">
        <h2>${article.title}</h2>
        <img src="${article.urlToImage ? article.urlToImage : ''}">
        <p>${article.description}</p>
      </a>
    `;
    }
}
//news-article links to index.js
//const el = document.createElement('news-article');
customElements.define('news-article', NewsArticle);
