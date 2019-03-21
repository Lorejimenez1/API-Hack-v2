const CRYPTO_SEARCH_URL = 'https://cors-anywhere.herokuapp.com/' + 'https://api.bitfinex.com/v2/tickers';
const CRYPTO_NEWS_URL = 'https://newsapi.org/v2/everything';
const BITFINEX_API = 'https://cors-anywhere.herokuapp.com/' + 'https://api-pub.bitfinex.com/v2/tickers?symbols=tBTCUSD,tMKRUSD,tBABUSD,tETHUSD,tDSHUSD,tBSVUSD,tLTCUSD,tZECUSD,tXMRUSD,tDGXUSD,tREPUSD,tMLNUSD';

function getAllStocks() {
  $.getJSON(BITFINEX_API, displayAllStocks);
}

function displayAllStocks(data) {
  let stockArray = data;

  $('#js-ticker-all-results').html(` 
  <h2>Live: Top crytpo prices</h2>
  <button aria-label="refresh button" class="btn green  fa fa-refresh refresh"></button>
  <div style="overflow-x:auto;">
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
  </div>  
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
  const news = data.articles.map((item, index) => renderNews(item));
  $('#js-news-results').prop('hidden', false);
  $('#js-news-results').html(news);
}

function renderNews(result) {
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
  $('#js-search-results').css("display", "block");
  $('#js-search-results').html(results);
}

function renderResult(result) {
  let stockArray = result
  if (result.length > 1) {
    return `
    <div style="overflow-x:auto;">  
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
    </div>  
    `;
  } else {
    return `
    <div style="overflow-x:auto;">
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
    </div>  
      `;
  }
}

function watchSubmit() {
  $('#js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('#js-query');
    const query = queryTarget.val().toUpperCase();
    getDataFromBitfinex(query, displaySearchData);
    getDataFromNewsApi(query, displayNewsData);
  });
}

function watchCompareButton() {
  $(".compare").click(function(event) {
    event.stopPropagation();
    $("h2").css("color", "#212121");
    $("body").css("background", "#fff");
    $(".nav").removeClass("active");
    $(".compare").addClass("active");
    $("#js-search-results").css("display", "none");
    $("#js-search-form").css("display", "none");
    $("#landing-section").css("display", "none");
    $("#js-ticker-all-results").css("display", "block");

  });
}

function home() {
  $(".home").click(function(event) {
    event.stopPropagation();
    $("body").css("background", "linear-gradient(to bottom, #1652EF 0%, 50%,#fff 50%,white 100%)");
    $("h2").css("color", "#fff");
    $(".nav").removeClass("active");
    $(".home").addClass("active"); 
    $("#js-search-form").css("display", "none");
    $('#js-ticker-all-results').css("display", "none");
    $("#js-search-results").css("display", "none");
    $("#landing-section").css("display", "block");
  });
}

function watchTickersButton() {
  $(".tickers").click(function(event) {
    event.stopPropagation();
    $("h2").css("color", "#212121");
    $("body").css("background", "#fff");
    $(".nav").removeClass("active");
    $(".tickers").addClass("active");
    $("#landing-section").css("display", "none");
    $('#js-ticker-all-results').css("display", "none");
    $("#js-search-form").css("display", "block");
  });
}
function watchRefresh() {
  $("#js-ticker-all-results").on('click', '.refresh', function(event) {
    event.stopPropagation();
    getAllStocks();
  });  
}

$(watchCompareButton);
$(watchTickersButton);
$(watchSubmit);
$(home);
$(getAllStocks);
$(watchRefresh);