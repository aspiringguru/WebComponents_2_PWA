
console.log("apiKey:", apiKey);
console.log("topHeadlinesUrl:", topHeadlinesUrl);

window.addEventListener('load', () => {
  fetchNews();
});


async function fetchNews() {
  const res = await fetch(topHeadlinesUrl);
  const json = await res.json();
  console.log("json:\n", json)
  const main = document.querySelector('main');

  json.articles.forEach(article => {
    console.log("article:\n", article);
    const el = document.createElement('news-article');
    el.article = article;
    main.appendChild(el);
  });

}
