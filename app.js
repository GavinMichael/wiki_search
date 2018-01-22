console.log('app.js loaded');

// handles the search trigger 
document.getElementById('searchBtn').addEventListener('click', function(e) {
    var keyword = document.getElementById('txtBox').value;
    getWikiData(keyword);
});

// handles the search trigger 
document.getElementById('txtBox').addEventListener('keyup', function(e) {
    var keyword = document.getElementById('txtBox').value;
    var errorDiv =  document.getElementById('txtInputError');
    // if error is shown, hide it when the user starts to type
    errorDiv.className = "alert alert-danger hidden"
    // if enter
    if (e.keyCode === 13) {
        
        if (keyword.length === 0) {
            errorDiv.className = "alert alert-danger show"
        } else {
            // if not empty string, proceed
            getWikiData(keyword);
        }
    }    
});

// handles the API call
function getWikiData(keyword) {
    console.log(keyword);
    var url = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&search=" + keyword;
    var XHR = new XMLHttpRequest();

    XHR.open('GET', url);
    XHR.onreadystatechange = function() {
        if (XHR.readyState === 4) {
            if (XHR.status === 200) {
                var results = JSON.parse(XHR.responseText);
                renderWikiResults(results);
            }
        }
    };
    XHR.send();
};

function renderWikiResults (results) {
    
    var resultsArea = document.getElementById('resultsArea');
    // if results area has any content, clear it before painting new results
    resultsArea.innerHTML = '';

    // loop through the Wiki results obj and paint the title + link, body
    for (var i = 0; i < results.length; i++) {

        var currentResult = `<div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">
                                        <a href="${results[3][i]}" target="_blank">
                                        ${results[1][i]}
                                        </a>
                                    </h5>
                                    ${results[2][i]}
                                </div>
                            </div>
                            <br>`;

        resultsArea.innerHTML += currentResult;
    }

}