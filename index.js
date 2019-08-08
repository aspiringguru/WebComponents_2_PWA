
console.log("apiKey:", apiKey);
console.log("topHeadlinesUrl:", topHeadlinesUrl);

window.addEventListener('load', () => {
  fetchNews();
  registerSW();
});


async function fetchNews() {
  const res = await fetch(topHeadlinesUrl);
  const json = await res.json();
  console.log("json:\n", json)
  const main = document.querySelector('main');

  json.articles.forEach(article => {
    //console.log("article:\n", article);
    const el = document.createElement('news-article');
    el.article = article;
    main.appendChild(el);
  });
}

async function registerSW() {
    if ('serviceWorker' in navigator) {
      console.log("'serviceWorker' in navigator, try navigator.serviceWorker.register ");
      try {
        await navigator.serviceWorker.register('./sw.js');
      } catch (e) {
        console.log(`SW registration failed`);
      }
    }
}
