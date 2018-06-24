const CRYPTO_SEARCH_URL= 'https://api.bitfinex.com/v2/tickers';
const CYPTO_COMPARE_URL= 'https://newsapi.org/v2/everything';
const SYMBOL_URL= 'https://api.bitfinex.com/v1/symbols'

function getDataFromCompare(searchTerm, searchTermTwo, callback) {
  const query = {
  q: `"${searchTerm}","${searchTermTwo}"`,
  sources: 'crypto-coins-news,reddit-r-all',
  sortBy: 'publishedAt',
  pageSize: `3`,
  apiKey: `96f21de33cdd4a99933cfcd4075c603b`,
  language: `en`,
}
  $.getJSON(CYPTO_COMPARE_URL, query, callback);
}

function displayNewsData(data) {
  console.log(data);
  const news = data.articles.map((item, index) => renderNews(item));
  $('#js-news-results').prop('hidden', false);
 $('#js-news-results').html(news);
}

function renderNews(result) {
  console.log(result)
  	return `
  	<div class=col-4>
  		<div class="card w3-hover-grayscale">
  			<img class="card-image"
  			src="${result.urlToImage}">
  			<div class="card-content">
  				<h3><a href="${result.url}" target="_blank">${result.title}</a>
  				</h3
				</div>
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
  
  const results = renderResult(data);
  $('.news-header').prop('hidden', false)
  $('#js-search-results').html(results);
}

function renderResult(result) {
  //console.log(result)
  const myArray = result
  return `<div id="grid-1" class="col-6">
          <table border="2">
          	<h2>${myArray[0][0]}</h2>
            <tr>
              <td>Price(usd)</td>
              <td>$${myArray[0][7]}</td>
            </tr>
            <tr>
              <td>DailyChange(perc.)</td>
              <td>%${myArray[0][6]}</td>
            </tr>
            <tr>
              <td>VOLUME24HR</td>
              <td>${myArray[0][8]}</td>
            </tr>
            <tr>
              <td>Low of Day</td>
              <td>${myArray[0][10]}</td>
            </tr>
            <tr>
              <td>High Of Day</td>
              <td>${myArray[0][9]}</td>
            </tr>
          </table>    
      </div>
        <div id="grid-1" class="col-6">
          <table  border="2">
          	<h2>${myArray[1][0]}</h2>
            <tr>
              <td>Price(usd)</td>
              <td>$${myArray[1][7]}</td>
            </tr>
            <tr>
              <td>DailyChange(perc.)</td>
              <td>%${myArray[1][6]}</td>
            </tr>
            <tr>
              <td>VOLUME24HR</td>
              <td>${myArray[1][8]}</td>
            </tr>
            <tr>
              <td>Low of Day</td>
              <td>${myArray[1][10]}</td>
            </tr>
            <tr>
              <td>High Of Day</td>
              <td>${myArray[1][9]}</td>
            </tr>
          </table>  
        </div>`;
}


function watchSubmit() {
	$('#js-search-form').submit(event => {
		event.preventDefault();
		const queryTarget = $(event.currentTarget).find('#js-query');
		const query = queryTarget.val().toUpperCase() ;
		const queryVs = $(event.currentTarget).find('#js-query-2');
		const queryTwo = queryVs.val().toUpperCase();
    getDataFromBitfinex(query, queryTwo, displaySearchData);
    getDataFromCompare(query, queryTwo, displayNewsData);
    });
}

/*function watchHelp() {
	$('#js-help-button').on('click', event => {
		event.preventDefault();
		$('#')

	}
*/


$(watchSubmit);
//$(watchHelp);
