var topics = ["happy","angry","mischievous","ecstatic","funny","victorious","hungry","hangry","worried","stressed","scared","satisfied"]

// Creates url based on parameters added
var url = "https://api.giphy.com/v1/gifs/search";
url += '?' + $.param({
    'q': "happy",
    'api_key': "aq2QKEzeOkwyPBsKY1OmdpET62y3UqqC"
});

// Makes the GET call to url and triggers function to save json payload
$.ajax({
    url: url,
    method: "GET"
}).then(function(response){
    
    var results = response.data;

    for(var i = 0; i < results.length; i++){

        var emotionImageUrl = results[i].images.downsized_still.url;

        var emotionsDiv = $("<div>");

        var emotionImage = $("<img>").attr("src",emotionImageUrl);
        emotionsDiv.append(emotionImage);

        var p = $("<p>").append("Title: " + results[i].title)
        $(p).append("<br>Rating: " + results[i].rating)
        $(p).append("<br>Username: " + results[i].username)
        $(p).append("<br>Created time: " + results[i].import_datetime + "</p>")

        emotionsDiv.append(p);

        $(".container").append(emotionsDiv);
    }
})