// ****************
// VIEW CONTROLLERS
// ****************
	var links = [
		"<span id='#homeArea'>home</span>",
		"<span id='#newsArea'>news</span>",
		"<span id='#mailArea'>mail</span>",
		"<span id='#entertainmentArea'>entertainment</span>",
		"<span id='#workoutArea'>workout</span>",
		"<span id='#learnArea'>learn</span>",
	];

	for (i = 0; i <= links.length - 1; i++)
	{
		$(".menu_panel").append("<div class='menu_item'>" + links[i] + "</div>");
	}

	var rootDir = "http://localhost/webshirt/";
	//var rootDir = "http://intheon.xyz/liv/";
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
			url: rootDir + "php/module_get_feed.php",
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
			url: rootDir + "php/module_pull_tasks.php",
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
			url: rootDir + "php/module_push_tasks.php",
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
			url: rootDir + "php/module_delete_tasks.php",
			type: "POST",
			data: { 
				idToDelete: stripped
			}
		});
	}

// **************
// MONEY CALCULATOR MODEL
// **************
	function addDebt()
	{
		var local = pullFromLocalStorage();

		if (!local)
		{
			// this is the block to handle a new user

			// draw an initial blank form
			$("#money").html("\
				<h3>Edit</h3>\
				<form name='money_form' id='money_form'>\
					<span>Monthly Pay</span>\
					<input type='text' placeholder='monthly pay' id='monthly_pay' name='monthly_pay'/>\
					<h3>Bills</h3>\
					<div class='money_inputs'>\
					<input type='text' placeholder='bill name' name='name' class='bill_name_label'/>\
					<input type='text' placeholder='amount here' name='value'/>\
					</div>\
					<input type='button' value='add more' id='bill_add'  />\
					<input type='button' value='submit' id='bill_submit'  />\
				</form>");

			// enable the user to add more if they wish
			$("#bill_add").click(function(){
				$(".money_inputs").append("\
					<input type='text' placeholder='bill name' name='name' class='bill_name_label'/>\
					<input type='text' placeholder='amount here' name='value'/>");
			});

			// register a handler to send it off to localstorage
			$("#bill_submit").click(function(){
				var formData = $("#money form").serializeArray();
				localStorage.setItem("bills",JSON.stringify(formData));
			});

			/*
			var parsed = JSON.parse(local);
			var basePay = parsed[0].value;

			console.log(parsed);

			*/
		}
		else
		{	
			// this block handles existing users

				// our ls object as a json string
				var parsed = JSON.parse(local);

				// how much i earn a month
				var base = parsed[0].value;

				// get rid of the first property, dont need it
				delete parsed[0];

				// loop through 
					console.log("this is working?");
				var htmlString = "";

				for (i in parsed)
				{

					console.log(parsed[i].name);
					if (parsed[i].name == "name")
					{
						htmlString += "<input type='text' value='"+parsed[i].value+"' name='name' class='bill_name_label' />";
					}
					else if (parsed[i].name == "value")
					{
						htmlString +="<input type='text' value='"+parsed[i].value+"' name='value' />";
					}
				}
			
			$("#money").html("<h3>Edit</h3>\
			<form name='money_form' id='money_form'>\
				<span>Monthly Pay</span>\
				<input type='text' placeholder='monthly pay' id='monthly_pay' name='monthly_pay' value='"+base+"'/>\
				<h3>Bills</h3>\
				<div class='money_inputs'>"+htmlString+"</div>\
				<input type='button' value='add more' id='bill_add'  />\
				<input type='button' value='submit' id='bill_submit'  />\
			</form>\
			");

			// enable the user to add more if they wish
			$("#bill_add").click(function(){
				$(".money_inputs").append("\
					<input type='text' placeholder='bill name' name='name' class='bill_name_label'/>\
					<input type='text' placeholder='amount here' name='value'/>");
			});

			// takes the value and overwrites the value in localstorage
			$("#bill_submit").click(function(){
				var formData = $("#money form").serializeArray();
				localStorage.setItem("bills",JSON.stringify(formData));
			});

		}


	}

	function pullFromLocalStorage()
	{
		var bills = localStorage.getItem("bills");

		if (!bills)
		{
			return false;
		}
		else
		{
			return bills;
		}

	}


// **************
// INITIALISATION
// **************
$( document ).ready(function(){


	getFeed("http://www.gamespot.com/feeds/reviews/","gamespot",6);
	getFeed("http://feeds.bbci.co.uk/news/technology/rss.xml","bbc",7);
	getFeed("http://feeds.sydv.net/latest-bash-quotes","bash",1);
	
	getTasks();

	$("#addMoreButton").click(function(){
		var newTask = $("#addMoreText").val();
			createTask(newTask,true);
	});

	$("#todo").click(function(){
  		if ($(".left_side_panel").is(":hidden")) 
  		{
     		console.log("showing");
     		$(".menu_panel").addClass("fade");
     		$(".menu_panel").removeClass("shown");
  		} 
  		else 
  		{
     		console.log("hidden");
     		$(".menu_panel").removeClass("fade");
     		$(".menu_panel").addClass("shown");
     	}
		$(".left_side_panel").slideToggle("slow");

	});

	$(".menu_panel .menu_item").click(function(event){
		var amount = $(event.currentTarget.childNodes[0].id).offset().top;
			amount -= 150;
			$("html, body").animate({
				scrollTop: amount
			},1000);
	});

	if (!pullFromLocalStorage())
	{
		$("#money").append("Localstorage is empty. <a href='#' class='addDebt'>Add some items</a>")
	}
	else
	{
		var current = JSON.parse(pullFromLocalStorage());
		var base = parseInt(current[0].value);
		var running = 0;

		delete current[0];

		for (i in current)
		{
			if (current[i].name == "value")
			{
				running += parseInt(current[i].value);
			}
		}

		var remains = base - running;

		$("#money").append("<div class='money_start_amount'><span>Initial: </span><span class='money_number'>&#163;"+base+"</span></div>");
		$("#money").append("<div class='money_out'><span>Out: </span><span class='money_number'>&#163;"+running+"</span><a href='#' class='addDebt'>(+)</a></div>");
		$("#money").append("<div class='money_remaining'><span>Remains: </span><span class='money_number'>&#163;"+remains+"</span></div>");

	}


	$(".addDebt").click(function(){
		addDebt();
	});

// because i cant be arsed to find out if there's a callback
setTimeout(function(){
	var o = tasks.todo.length;
	$("#todoNumbers").html(o)
},100);

// also want to make sure there's only one panel on the page at one time.

var current;

setTimeout(function(){
	var wow = $(".area:first-child").height();

	if (wow >= 880)
	{
		$(".quote").addClass("trunc");
	}
	else if (wow <= 800)
	{
		$(".area:first-child").css("margin-bottom","8.5%");
	}
},1500);

});

//localStorage.removeItem("bills");


