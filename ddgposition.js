const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

if(urlParams.has('q')){
    const QuerySearch = urlParams.get('q');

    let xhr = new XMLHttpRequest();
    xhr.onload = function(){
        let results = Array.from(this.responseXML.getElementsByClassName('result')).map(result => result.getElementsByClassName('result__a')[0].href);

        results = results.filter(result => !result.startswith('https://duckduckgo.com/y.js'));
        applyResults(results);
    }

    xhr.open('GET', ' https://html.duckduckgo.com/html/?q=' + QuerySearch, true);
    xhr.responseType = 'document';
    xhr.send();
}

function applyResults(results){
    console.log(results)
    let googleResults = Array.from(document.getElementsByClassName('r')).map(result => result.getElementsByTagName('a')[0]);
    for (const gResult of googleResults) {
        let url = gResult.href;
        if (url.startsWith(window.location.origin + '/url')) {
            const _urlParams = new URLSearchParams(url);
            if (_urlParams.has('url')) {
                url = _urlParams.get('url');
            }
            else{
                continue;
            }
        }

        const ddgPosition = results.findIndex((element) => element === url);
        if (ddgPosition >= 0){
            gResult.insertAdjacentHTML('beforeend', '<div style="background-color: #de5833; position: absolute; top:0; right:0;"><p style="font-size: 15px; color: white; margin: 0; padding: 2px 9px 2px 9px;">'+(ddgPosition+1)+'</p></div>');
        }
    }
}
