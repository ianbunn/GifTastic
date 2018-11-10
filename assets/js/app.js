// Topics array
var topics = ["happy","angry","mischievous","ecstatic","funny","victorious","hungry","hangry","worried","stressed","scared","satisfied"]
var topicSelected;
var newTopic;

// Create form to take in more topics


// Create buttons based on topics array
for(v in topics){
    var topicButtons = $("<button>");
    topicButtons.text(topics[v]);
    $("#topicButtons").append(topicButtons);
}


$("#newTopic").on("click", function(){
    event.preventDefault();

    var newTopic = $("#userTopic").val().trim();
    $("#form")[0].reset();
    if(topics.indexOf(newTopic) === -1){
        topics.push(newTopic);
        var newTopicButton = $("<button>");
        newTopicButton.text(newTopic);
        $("#topicButtons").append(newTopicButton);
    }
})

// When button is clicked run this code block
$("button").on("click",function(){

    $("#emotionsDiv").empty();
    
    // Get the button text as topicSelected
    topicSelected = $(this).text();

    // Creates url based on parameters added
    var url = "https://api.giphy.com/v1/gifs/search";
    url += '?' + $.param({
        'q': topicSelected,
        'api_key': "aq2QKEzeOkwyPBsKY1OmdpET62y3UqqC"
    });

    // Makes the GET call to url and triggers function to save json payload
    $.ajax({
        url: url,
        method: "GET"
    }).then(function (response) {

        // Save JSON in results
        var results = response.data;

        for (var i = 0; i < results.length; i++) {

            var stillImageUrl = results[i].images.downsized_still.url;

            // Create div for card
            var emotionDiv = $("<div>");
            // Add class col-sm-4
            emotionDiv.addClass("col-sm-4")

            // Create card
            var emotionCard = $("<div>")
            emotionCard.addClass("card")

            // Create img, add card-img-top class and append to card
            var emotionImage = $("<img>").attr("src", stillImageUrl);
            emotionImage.addClass("card-img-top");
            emotionCard.append(emotionImage);

            // Create title for card, add card-body class
            // Create h5 header , add class card-title and append to emotion title
            var emotionTitle = $("<div>")
            emotionTitle.addClass("card-body")
            var emotionTitleHeading = $("<h5>")
            emotionTitleHeading.addClass("card-title")
            emotionTitleHeading.append(results[i].title);
            emotionTitle.append(emotionTitleHeading);
            // Append emotion title and heading to card
            emotionCard.append(emotionTitle);

            // Create info for card
            var emotionInfoList = $("<ul>");
            emotionInfoList.addClass("list-group","list-group-flush");
            // Create items for info in card
            // Create rating item and append to list
            var emotionInfoRating = $("<li>");
            emotionInfoRating.addClass("list-group-item");
            emotionInfoRating.append("Rating: " + results[i].rating);
            emotionInfoList.append(emotionInfoRating);
            // Create username item and append to list
            var emotionInfoUsername = $("<li>")
            emotionInfoUsername.addClass("list-group-item")
            emotionInfoUsername.append("Username: " + results[i].rating);
            emotionInfoList.append(emotionInfoUsername);
            // Create created time item and append to list
            var emotionInfoCreatedTime= $("<li>")
            emotionInfoCreatedTime.addClass("list-group-item")
            emotionInfoCreatedTime.append("Created Time: " + results[i].rating);
            emotionInfoList.append(emotionInfoCreatedTime);
            emotionCard.append(emotionInfoList);

            // Append emotion card to emotion div
            emotionDiv.append(emotionCard)
            $("#emotionsDiv").append(emotionDiv);
        }

    })
})

