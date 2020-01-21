
  

$(document).ready(function () {

$("#findRestaurants").on("click", function(event) {
    console.log("insideClick")
	$("tbody").children().remove()
    event.preventDefault();
    // runds findRestaurants function
    findRestaurants();
});


    function findRestaurants() {
        //first ajax call to get city ID from Zomato
        var search = $("#restaurants").val().trim();
        var queryURL = "https://developers.zomato.com/api/v2.1/cities?q=" + search;
        $.ajax({
            url: queryURL,
            method: "GET",
            headers: {"user-key": "d98b7c9f57eb25d56ad8cfe06c249602"},
            dataType: "json",
        })
        .then(function(response){
            console.log(response);
            console.log(response.location_suggestions[0].id);
			
            //second call to get the actual info that I want using Zomato ID
            var searchID = response.location_suggestions[0].id;
			var node = document.getElementById("restaurant-table");

            var queryURL = "https://developers.zomato.com/api/v2.1/search?entity_id=" + searchID+"&entity_type=city";
            $.ajax({
                url: queryURL,
                method: "GET",
                headers: {"user-key": "d98b7c9f57eb25d56ad8cfe06c249602"},
                dataType: "json",
            })
            .then(function(response2){
                console.log(response2);
				 var pubs = [];
				 
				
					pubs = response2.restaurants;
					for (var j = 0; j < pubs.length; j++) {
						(function(val) {
										
        var name = pubs[j].restaurant.name;
        var location = pubs[j].restaurant.location;
        var urls = pubs[j].restaurant.url;
        var cuisine = pubs[j].restaurant.cuisines;
        var userRating = pubs[j].restaurant.user_rating;
		var votes = pubs[j].restaurant.user_rating.votes;
		var costPrice= "Costs "+ pubs[j].restaurant.currency+" "+pubs[j].restaurant.average_cost_for_two+" for two";
		var establishment = pubs[j].restaurant.establishment;
        var phoneNumber = pubs[j].restaurant.phone_numbers;
        
        // appending the results to the table
        $("#restaurant-table > tbody").append(
		"<div class='data img-rounded'>"+
		"<div class='rating'>"+
		"<span title='" + userRating.rating_text + "'><p style='color:white;background-color:#" + userRating.rating_color + ";border-radius:4px;border:none;padding:2px 10px 2px 10px;text-align: center;text-decoration:none;display:inline-block;font-size:20px;font-weight: bold;float:right;'><strong>" + userRating.aggregate_rating + " </strong> /5</p></span><br>"+
		" <h10 style='color:grey;font-size:10px'> " + votes + " votes </h10>"+
		"</div>"+
		"<img class='resimg img-rounded' src=" + pubs[j].restaurant.thumb + " alt='Restaurant Image' height='100' width='100'>"+
		"<a href=" + urls + " target='_blank' class='action_link'><h2 style='color:black;'><strong>" + name + "</strong></h2></a><br>"+
		" <h10 style='color:grey;font-size:12px'> " + location.locality + " . "+ "</h10>  <h10 style='color:grey;font-size:12px'>" + establishment + "</h10><br><hr>"+
		" <h10 style='color:red;font-size:12px'> " + cuisine + "</h10> . <h10 style='color:gray;font-size:12px'>" + costPrice + "</h10><br>"+
		"</div><br>");
						
						})(j);
					}
	
            });
        });
    };




});





