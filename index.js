const CRYPTO_SEARCH_URL= 'https://api.bitfinex.com/v2/tickers';
const CYPTO_COMPARE_URL= 'https://min-api.cryptocompare.com/data/v2/news/'

function getDataFromCompare(searchTerm, searchTermTwo, callback) {
  const query = {
  categories: `${searchTerm},${searchTermTwo}`
}
  $.getJSON(CYPTO_COMPARE_URL, query, callback);
}

function displayNewsData(data) {
  console.log(data);
  const news = data.Data.map((item, index) => renderNews(item));
  console.log(news);
 $('.js-news-results').html(news);
}

function renderNews(result) {
  
  return `<div class="row">
  <div class="col-12">
    <h2>Latest News Articles</h2>
    <ul>
      <li><a href="${result.url}">${result.title}</a></li>
    </ul>
  </div>
</div>  
  `;

}

function getDataFromBitfinex(searchTerm, searchTermTwo, callback) {
  const query = {
  symbols: `t${searchTerm}USD,t${searchTermTwo}USD`
  
}
  $.getJSON(CRYPTO_SEARCH_URL, query, callback);
}

function displaySearchData(data) {
  console.log(data);
  const results = data.map((item, index) => renderResult(item));
 // console.log(item);
  console.log(results);
  $('#js-search-results').html(results);
}

function renderResult(result) {
  console.log(result)
  const myArray = result
  return `<div id="grid-1" class="col-6">
          <table border="2">
            <tr>
              <td>Price(usd)</td>
              <td>${myArray[7]}</td>
            </tr>
            <tr>
              <td>OPENDAY</td>
              <td>5666</td>
            </tr>
            <tr>
              <td>VOLUME24HR</td>
              <td>133,333</td>
            </tr>
          </table>    
      </div>
        <div class="col-6" id="grid-2">
          <table border="2">
            <tr>
              <td>Price(usd)</td>
              <td>${myArray[1][7]}</td>
            </tr>
            <tr>
              <td>OPENDAY</td>
              <td>5666</td>
            </tr>
            <tr>
              <td>VOLUME24HR</td>
              <td>133,333</td>
            </tr>
          </table>   
        </div>`;
}

function watchSubmit() {
$('#js-search-form').submit(event => {
		event.preventDefault();
		const queryTarget = $(event.currentTarget).find('#js-query');
		const query = queryTarget.val();
		queryTarget.val("");
		const queryVs = $(event.currentTarget).find('#js-query-2');
		const queryTwo = queryVs.val();
    getDataFromBitfinex(query, queryTwo, displaySearchData);
    getDataFromCompare(query, queryTwo, displayNewsData);
    });
}
$(watchSubmit);