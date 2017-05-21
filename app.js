//The logic behind the gifs!

var topics = ["darth vader","joker","venom","voldemort","gollum"];

for (i=0; i < topics.length; i++) {
    $("#buttons").append("<button data-villain=" + topics[i] + ">" + topics[i] +"</button>");  
}


$("button").on("click",function() {

    var villain = $(this).attr("data-villain");

    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + villain + "&api_key=dc6zaTOxFJmzC&limit=10";

    
    $.ajax({
        url: queryURL,
        method: "GET"
    })

    .done(function(response) {
        console.log(response);
    
        var results = response.data;

        for (var z = 0; z < results.length; z++) {
            var villainDiv = $("<div>");

            var pRating = $("<p>").text("Rating: " + results[z].rating);

            var villainImage = $("<img>");

            //place here the src attribute for the stills, later an if else statement for data state
            villainImage.attr("src", results[z].images.fixed_height_still.url);
            villainImage.attr("class", "villainGif");
            villainImage.attr("data-state", "still");
            villainImage.attr("data-still", results[z].images.fixed_height_still.url);
            villainImage.attr("data-animate", results[z].images.fixed_height.url);

            villainDiv.append(pRating);
            villainDiv.append(villainImage);

            $("#gifs").prepend(villainDiv);
        }

        $(".villainGif").on("click", function() {
            var state = $(this).attr("data-state");


            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            }
            else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        })

    });

});


