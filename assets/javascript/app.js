$(document).ready(function() {

	var topics = ["dog", "cat", "chicken", "goat", "llama", "unicorn"];

	for (var i = 0; i < topics.length; i++) {
	    var topicBtn = $("<button>");
	    topicBtn.addClass("btn btn-primary");
	    topicBtn.text(topics[i]);
	    $("#buttons").append(topicBtn);
    }
});