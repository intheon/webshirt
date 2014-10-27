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