// ****************
// VIEW CONTROLLERS
// ****************
	var links = [
		"<a href='index.html'>home</a>",
		"<a href='mail.html'>mail</a>",
		"<a href='entertainment.html'>entertainment</a>",
		"<a href='workout.html'>workout</a>",
	];

	for (i = 0; i <= links.length - 1; i++)
	{
		$(".menu_panel").append("<div class='menu_item'>" + links[i] + "</div>");
	}
// the above just dynamically adds in links 
// because i cant be bothered to hard code them

	function detectChanges(changes)
	{
		$("#"+changes[0].name).append(xmlResponses[changes[0].name]);
	}


// *********
// RSS MODEL
// *********
	function getFeed(websiteUrl,tag)
	{
		$.ajax({
			url: "http://localhost/webshirt/php/module_get_feed.php",
			type: "POST",
			data: {
				website: websiteUrl
			},

			success: function(response)
			{
				xmlResponses[tag] = response
			}
		});
	}
// this accepts urls of valid feeds and sends 
// them to a php module_get_feed
	var xmlResponses = {};
	Object.observe(xmlResponses,function(changes){
		detectChanges(changes);
	});
// the response does get put in it's own object
// it even has a listener to perform a callback (function) when it changes!

// **************
// INITIALISATION
// **************
$( document ).ready(function(){
	getFeed("http://www.gamespot.com/feeds/reviews/","gamespot");
	getFeed("http://feeds.bbci.co.uk/news/technology/rss.xml","bbc");
});


