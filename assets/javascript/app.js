$(document).ready(function() {

    var topics = ["dog", "cat", "chicken", "goat", "llama", "unicorn", "pokemon"];
    var topicBtn;
    var gifSpace;
    var img;

    for (var i = 0; i < topics.length; i++) {
        topicBtn = $("<button>");
        topicBtn.addClass("btn btn-primary topic-button");
        topicBtn.text(topics[i]);
        $("#buttons").append(topicBtn);
    }

    $(".topic-button").on("click", function() {

        $("#gifs").empty();
        console.log($(this).text());
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + $(this).text() + "&limit=10&api_key=dc6zaTOxFJmzC";

        $.ajax({ url: queryURL, method: "GET" }).done(function(response) {
            console.log(response);
            for (var i = 0; i < response.data.length; i++) {
                gifSpace = $("<div>");
                gifSpace.data("index", i);
                gifSpace.addClass("gif-space");
                $("#gifs").append(gifSpace);
                img = $("<img src='" + response.data[i].images.fixed_height_still.url + "' />");
                gifSpace.append(img);
                rating = $("<p>Rating: " + response.data[i].rating + "</p>");
                gifSpace.append(rating);
            }
            //TODO make it possible to stop/start gif more than once
            $(".gif-space").on("click", function() {
                var index = $(this).data("index");
                $(this).children().attr("src", response.data[index].images.fixed_height.url);
                $(this).on("click", function() {
                    $(this).children().attr("src", response.data[index].images.fixed_height_still.url);
                });
            });
        });
    });

    //TODO Form to add topic
    // $("form").on("submit", function(event) {
    //     event.preventDefault();
    //     console.log($(this).serialize());
    // });

});
