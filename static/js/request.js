resultsArr = []

function sendRequest() {
    return gapi.client.youtube.search.list({
        "q": 'python JavaScript -basics',
        "part": "snippet",
        "maxResults": 30,
        "order": "date",
        "type": "video",
        "publishedAfter":"2018-08-04T00:00:00Z"
    })
}


function formatData(data){
    data.forEach(el => (el.snippet.title.toLowerCase().includes("python") &&
                        el.snippet.title.toLowerCase().includes("javascript") &&
                        resultsArr.length < 15 )
    ? resultsArr.push({"title": el.snippet.title, "time": el.snippet.publishedAt}) : {} );
}

function sortedArr(arr){
    arr.sort(function (a, b) {
        return moment(a.time).unix() - moment(b.time).unix();
    });
    return arr
}

function appendRow(el){
    $('#results').append( "<tr><td>"+ el.title +"</td><td>"+ el.time +"</td></tr>" )
}

function formatTime(time){
    formatted_time = moment(time).format("h:mm:ss a, MMM Do YYYY");
    return formatted_time
}

function fillTable(){
    $("#request").fadeOut();
    $("#out").fadeOut();
    $("#results_table").fadeIn();
    sortedArr(resultsArr).forEach(el => {el.time = formatTime(el.time); appendRow(el)})
}

function addData(response){
    formatData(response.result.items);
    console.log(resultsArr);
    fillTable();
}


function getResults(){
    sendRequest()
        .then( (response) => addData(response),
               (err) =>  out.innerText = "Error: " + err.result.error.message )
}