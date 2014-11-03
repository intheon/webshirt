// ****************
// VIEW CONTROLLERS
// ****************
	var links = [
		"<a href='index.html'>home</a>",
		"<a href='news.html'>news</a>",
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
		var obj = JSON.parse(xmlResponses[changes[0].name]);
		for (keys in obj)
		{
			$("#"+changes[0].name).append("<p><a href='"+obj[keys].link+"' target='_blank'>"+obj[keys].title+"</p></a>");
		}
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
				//console.log(response);
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

	$("#addMoreButton").click(function(){
		var obj = {};
		var count = 0;
		var newTask = $("#addMoreText").val();
			count++

			obj["item"+count] = newTask;

			localStorage.setItem("tasks",obj);
			$(".toDoList").append("<p>"+newTask+"</p>");
	});
});

