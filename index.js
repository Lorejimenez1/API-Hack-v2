const CRYPTO_SEARCH_URL= 'https://cors-anywhere.herokuapp.com/'+'https://api.bitfinex.com/v2/tickers';
const CRYPTO_NEWS_URL= 'https://newsapi.org/v2/everything';
const bitfinex_api = 'https://cors-anywhere.herokuapp.com/'+'https://api-pub.bitfinex.com/v2/tickers?symbols=tBTCUSD,tMKRUSD,tBABUSD,tETHUSD,tDSHUSD,tBSVUSD,tLTCUSD,tZECUSD,tXMRUSD,tDGXUSD,tREPUSD,tMLNUSD';


function getAllStocks() {
  $.getJSON(bitfinex_api, displayAllStocks);
}

function displayAllStocks(data) {
  
  let stockArray = data;

  $('#js-ticker-all-results').html(` 
  <table class="darkTable">
  <thead>
    <tr>
    <th>Symbol</th>
    <th>Last Price</th>
    <th>24H Change</th>
    <th>24H High</th>
    <th>24H Low</th>
    <th>24H Volume</th>
    </tr>
    </thead>
    <tbody>
    <tr>
    <td>${stockArray[0][0].slice(1, 4)}</td><td>${stockArray[0][1]}</td><td>${stockArray[0][2].toFixed(2)}</td><td>${stockArray[0][3]}</td><td>${stockArray[0][4].toFixed(2)}</td><td>${stockArray[0][5]}</td></tr>
    <tr>
    <td>${stockArray[1][0].slice(1, 4)}</td><td>${stockArray[1][1]}</td><td>${stockArray[1][2].toFixed(2)}</td><td>${stockArray[1][3]}</td><td>${stockArray[1][4].toFixed(2)}</td><td>${stockArray[1][5]}</td></tr>
    <tr>
    <td>${stockArray[2][0].slice(1, 4)}</td><td>${stockArray[2][1]}</td><td>${stockArray[2][2].toFixed(2)}</td><td>${stockArray[2][3]}</td><td>${stockArray[2][4].toFixed(2)}</td><td>${stockArray[2][5]}</td></tr>
    <tr>
    <td>${stockArray[3][0].slice(1, 4)}</td><td>${stockArray[3][1]}</td><td>${stockArray[3][2].toFixed(2)}</td><td>${stockArray[3][3]}</td><td>${stockArray[3][4].toFixed(2)}</td><td>${stockArray[3][5]}</td></tr>
    <tr>
    <td>${stockArray[4][0].slice(1, 4)}</td><td>${stockArray[4][1]}</td><td>${stockArray[4][2].toFixed(2)}</td><td>${stockArray[4][3]}</td><td>${stockArray[4][4].toFixed(2)}</td><td>${stockArray[4][5]}</td></tr>
    <tr>
    <td>${stockArray[5][0].slice(1, 4)}</td><td>${stockArray[5][1]}</td><td>${stockArray[5][2].toFixed(2)}</td><td>${stockArray[5][3]}</td><td>${stockArray[5][4].toFixed(2)}</td><td>${stockArray[5][5]}</td></tr>
    <tr>
    <td>${stockArray[6][0].slice(1, 4)}</td><td>${stockArray[6][1]}</td><td>${stockArray[6][2].toFixed(2)}</td><td>${stockArray[6][3]}</td><td>${stockArray[6][4].toFixed(2)}</td><td>${stockArray[6][5]}</td></tr>
    <tr>
    <td>${stockArray[7][0].slice(1, 4)}</td><td>${stockArray[7][1]}</td><td>${stockArray[7][2].toFixed(2)}</td><td>${stockArray[7][3]}</td><td>${stockArray[7][4].toFixed(2)}</td><td>${stockArray[7][5]}</td></tr>
    <tr>
    <td>${stockArray[8][0].slice(1, 4)}</td><td>${stockArray[8][1]}</td><td>${stockArray[8][2].toFixed(2)}</td><td>${stockArray[8][3]}</td><td>${stockArray[8][4].toFixed(2)}</td><td>${stockArray[8][5]}</td></tr>
    <tr>
    <td>${stockArray[9][0].slice(1, 4)}</td><td>${stockArray[9][1]}</td><td>${stockArray[9][2].toFixed(2)}</td><td>${stockArray[9][3]}</td><td>${stockArray[9][4].toFixed(2)}</td><td>${stockArray[9][5]}</td></tr>
    <tr>
    <td>${stockArray[10][0].slice(1, 4)}</td><td>${stockArray[10][1]}</td><td>${stockArray[10][2].toFixed(2)}</td><td>${stockArray[10][3]}</td><td>${stockArray[10][4].toFixed(2)}</td><td>${stockArray[10][5]}</td></tr>
    </tbody>
    </tr>
  </table>
  `);
}
function getDataFromNewsApi(searchTerm, searchTermTwo, callback) {
  const query = {
  q: `"${searchTerm}","${searchTermTwo}","Crypto"`,
  sources: 'crypto-coins-news,reddit-r-all,cnn,cnbc',
  sortBy: 'publishedAt',
  pageSize: `3`,
  apiKey: `96f21de33cdd4a99933cfcd4075c603b`,
  language: `en`,
}
  $.getJSON(CRYPTO_NEWS_URL, query, callback);
}

function displayNewsData(data) {
  console.log(data);
  const news = data.articles.map((item, index) => renderNews(item));
  $('#js-news-results').prop('hidden', false);
 	$('#js-news-results').html(news);
}

function renderNews(result) {
  //console.log(result)
  	return `
  	<div class=col-4>
  		<div class="card w3-hover-grayscale">
  			<img class="card-image" alt="${result.description}"
  			src="${result.urlToImage}">
  			<div class="card-content">
  				<h3><a href="${result.url}" target="_blank">${result.title}</a>
  				</h3>
  				<p>News from: ${result.source.id}</p>
				</div>
			</div>		
  	</div>
  	`;
}
 
function getDataFromBitfinex(searchTerm, callback) {
  const query = {
  symbols: `t${searchTerm}USD,t${searchTerm}BTC`
  
}
  $.getJSON(CRYPTO_SEARCH_URL, query, callback);
}

function displaySearchData(data) {
  const results = renderResult(data);
  $('#js-search-results').prop('hidden', false);
  $('#js-search-results').html(results);
}

function renderResult(result) {
   //console.log(result)
  let stockArray = result
  if (result.length > 1) {
  return `
  <table class="darkTable">
  <thead>
    <tr>
    <th>Symbol</th>
    <th>Last Price</th>
    <th>24H Change</th>
    <th>24H High</th>
    <th>24H Low</th>
    <th>24H Volume</th>
    </tr>
    </thead>
    <tbody>
    <tr>
    <td>${stockArray[0][0].slice(1)}</td><td>${stockArray[0][1]}</td><td>${stockArray[0][2].toFixed(2)}</td><td>${stockArray[0][3]}</td><td>${stockArray[0][4].toFixed(2)}</td><td>${stockArray[0][5]}</td></tr>
    <tr>
    <td>${stockArray[1][0].slice(1)}</td><td>${stockArray[1][1]}</td><td>${stockArray[1][2].toFixed(2)}</td><td>${stockArray[1][3]}</td><td>${stockArray[1][4].toFixed(2)}</td><td>${stockArray[1][5]}</td></tr>
    </tbody>
    </tr>
  </table>
    `;
  }
  else {
    return `
    <table class="darkTable">
    <thead>
      <tr>
      <th>Symbol</th>
      <th>Last Price</th>
      <th>24H Change</th>
      <th>24H High</th>
      <th>24H Low</th>
      <th>24H Volume</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td>${stockArray[0][0].slice(1)}</td><td>${stockArray[0][1]}</td><td>${stockArray[0][2].toFixed(2)}</td><td>${stockArray[0][3]}</td><td>${stockArray[0][4].toFixed(2)}</td><td>${stockArray[0][5]}</td></tr>
      <tr>
      </tbody>
      </tr>
    </table>
      `;
  }
}

function watchSubmit() {
	$('#js-search-form').submit(event => {
		event.preventDefault();
		const queryTarget = $(event.currentTarget).find('#js-query');
		const query = queryTarget.val().toUpperCase() ;
    getDataFromBitfinex(query, displaySearchData);
    getDataFromNewsApi(query, displayNewsData);
    });
}
function watchCompareButton() {
  $(".nav-compare").click(function(event) {
    event.stopPropagation();
    b = $(".col-4").detach();    
    $('#js-ticker-all-results').prop('hidden', false);
    $("table").css("visibility", "visible");
  });
}
function home() {
  $(".nav-home").click(function(event) {
    event.stopPropagation();
    $("#landing-section").prepend(x);
    $("#landing-section").prepend(b);
    $("table").css("visibility", "hidden");
  });
}
function watchTickersButton() {
  $(".nav-tickers").click(function(event) {
    event.stopPropagation();
    x = $(".col-4").detach();     
    $("#js-search-form").css("display", "block");
  });
}


$(watchCompareButton);
$(watchTickersButton);
$(watchSubmit);
$(home);
$(getAllStocks);
