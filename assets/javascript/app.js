$(document).ready(function() {

    var topics = ["dog", "cat", "chicken", "goat", "llama", "unicorn", "pokemon"];
    var topicBtn;
    var gifSpace;
    var img;
    var still;
    var animated;

    for (var i = 0; i < topics.length; i++) {
        topicBtn = $("<button>");
        topicBtn.addClass("btn btn-primary topic-button");
        topicBtn.text(topics[i]);
        $("#buttons").append(topicBtn);
    }

    var displayGifs = function() {

        $("#gifs").empty();
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + $(this).text() + "&limit=10&api_key=dc6zaTOxFJmzC";

        $.ajax({ url: queryURL, method: "GET" }).done(function(response) {
            for (var i = 0; i < response.data.length; i++) {
                gifSpace = $("<div>");
                gifSpace.attr("data-state", "still");
                gifSpace.addClass("gif-space");
                $("#gifs").append(gifSpace);
                animated = response.data[i].images.fixed_height.url;
                still = response.data[i].images.fixed_height_still.url;
                img = $("<img src='" + still + "' />");
                gifSpace.attr("data-still", still);
                gifSpace.attr("data-animated", animated);
                gifSpace.append(img);
                rating = $("<p>Rating: " + response.data[i].rating + "</p>");
                gifSpace.append(rating);
            }
        });
    };

    var playPause = function() {
        var state = $(this).attr("data-state");
        if(state === "still") {
            $(this).children("img").attr("src", $(this).data("animated"));
            $(this).attr("data-state", "animated");
        } else {
            $(this).children("img").attr("src", $(this).data("still"));
            $(this).attr("data-state", "still");
        }
    };

    $("#add-topic").on("click", function(event) {
        event.preventDefault();
        var newTopic = $("#topic-input").val();
        topicBtn = $("<button>");
        topicBtn.addClass("btn btn-primary topic-button");
        topicBtn.text(newTopic);
        $("#buttons").append(topicBtn);
        $("#topic-input").val("");
     });

    $(document).on("click", ".topic-button", displayGifs);
    $(document).on("click", ".gif-space", playPause);

});
