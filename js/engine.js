// ****************
// VIEW CONTROLLERS
// ****************
	var links = [
		"<span id='#homeArea'>home</span>",
		"<span id='#newsArea'>news</span>",
		"<span id='#mailArea'>mail</span>",
		"<span id='#entertainmentArea'>entertainment</span>",
		"<span id='#workoutArea'>workout</span>",
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

		if (changes[0].name == "bash")
		{
			$("#"+changes[0].name).append("<p>"+obj[0].description+"</p>");
		}
		else
		{
			for (keys in obj)
			{
				$("#"+changes[0].name).append("<p><a href='"+obj[keys].link+"' target='_blank'>"+obj[keys].title+"</p></a>");
			}
		}
	}


// *********
// RSS MODEL
// *********
	function getFeed(websiteUrl,tag,limit)
	{
		$.ajax({
			url: "http://localhost/webshirt/php/module_get_feed.php",
			type: "POST",
			data: {
				website: websiteUrl,
				quant: limit,
				tagline: tag
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
// TODO MODEL
// **************
	var tasks = {};
	Object.observe(tasks,function(changes){
		listTasks(changes);
	});

	function getTasks()
	{
		$.ajax({
			url: "http://localhost/webshirt/php/module_pull_tasks.php",
			type: "GET",
			success: function(response)
			{
				tasks.todo = JSON.parse(response);
			}
		});
	}

	function listTasks(changes)
	{
		// 'changes' tells us the new stuff
		//console.log(changes);
		if (changes[0].type == "update")
		{
			var newObj = changes[0].object.todo[changes[0].object.todo.length-1];
			$(".toDoList").append("<p>\
				"+newObj.task+"\
				<span class='deleteIcon' id='del_"+newObj.id+"'>x</span>\
				</p>");
			$("#del_"+newObj.id).click(function(){
				// remove from db
				deleteRecord(this.id);
				// remove it from the dom so i cant see it!
				this.parentElement.remove();
			});
		}
		else
		{
			for(i=0;i<=tasks.todo.length-1;i++)
				{
					$(".toDoList").append("<p>\
						"+tasks.todo[i].task+"\
						<span class='deleteIcon' id='del_"+tasks.todo[i].id+"'>x</span>\
						</p>");
					// add listeners for each
					$("#del_"+tasks.todo[i].id).click(function(){
						// remove from db
						deleteRecord(this.id);
						// remove it from the dom so i cant see it!
						this.parentElement.remove();
					});
				}	
		}
	}

	function createTask(newText)
	{
		$.ajax({
			url: "http://localhost/webshirt/php/module_push_tasks.php",
			type: "POST",
			data: {
				taskText: newText
			},
			success: function(response)
			{
				//console.log(response);
				getTasks();
			}
		});
	}

	function deleteRecord(id)
	{
		var stripped = id.substr(4,id.length);

		$.ajax({
			url: "http://localhost/webshirt/php/module_delete_tasks.php",
			type: "POST",
			data: { 
				idToDelete: stripped
			}
		});
	}


// **************
// INITIALISATION
// **************
$( document ).ready(function(){
	getFeed("http://www.gamespot.com/feeds/reviews/","gamespot",6);
	getFeed("http://feeds.bbci.co.uk/news/technology/rss.xml","bbc",7);
	getFeed("http://feeds.bbci.co.uk/news/technology/rss.xml","bbc",7);
	getFeed("http://feeds.sydv.net/latest-bash-quotes","bash",1);
	
	getTasks();

	$("#addMoreButton").click(function(){
		var newTask = $("#addMoreText").val();
			createTask(newTask,true);
	});

	$("#todo").click(function(){
		$(".left_side_panel").slideToggle("slow");
	});

	$(".menu_panel span").click(function(event){
		var blah = $(event.currentTarget.id).offset().top;
			blah -= 150;
		$("html, body").animate({
			scrollTop: blah
		},1000);

		console.log($(event.currentTarget.id).offset());
		//console.log(event.currentTarget.id);
	});
});





