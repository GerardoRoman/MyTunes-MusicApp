const form = document.querySelector("#search-form");

const baseUrl = 'https://itunes.apple.com/search?term=';

const container = document.querySelector('#musicContainer');

const player = document.querySelector("#audio");

form.addEventListener('submit', function (event) {
    event.preventDefault();
    console.log(event.target);
    let term = document.querySelector('#search-text').value;
    console.log(`Search term: ${term}`);
    search(term);
})

function search (searchTerm) {
    let searchUrl = `${baseUrl}${searchTerm}&media=music`;
    console.log(searchUrl);
    fetch(searchUrl, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })
    .then(function (response) {
        console.log("first .then (promise) executed")
        return response.json();
    })
    .then(function (resultsData){
        console.log("second .then executed")
        console.log('here is what we got back from the API', resultsData.results);
        resultsData.data;
        buildResultsHtml(resultsData.results)
    });
}

// display results from API
function buildResultsHtml(resultsArray) {

    // for no results
    if (resultsArray.length === 0) {
        let noResults = document.createElement("p");
        noResults.classList.add("no-results");
        noResults.innerText = "No results found";
        container.appendChild(noResults);
        return;

    } else {
    for (let result of resultsArray) {
        let songDiv = document.createElement("div");
        musicContainer.appendChild(songDiv);

    // album art
        let coverDiv = document.createElement("img");
        coverDiv.classList.add("picture");
        coverDiv.src = result.artworkUrl100;
        songDiv.appendChild(coverDiv);

    // song title
        let songTitle = document.createElement("h1");
        songTitle.innerText = result.trackName;
        songDiv.appendChild(songTitle);

    // artist name
        let artistEl = document.createElement("h2");
        artistEl.innerText = result.artistName
        songDiv.appendChild(artistEl);

    // music player
        coverDiv.addEventListener("click", function (event) {
        let playSrc = `${result.previewUrl}`;
        console.log(playSrc);
        player.src = playSrc;
    })
    }
}
}