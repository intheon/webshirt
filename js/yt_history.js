var playlistId;
function handleAPILoaded()
{
  getPlayListIds();
}

// a 'callback' is a function that is sprung when something happened
// its all event based baby!


// so im gonna use the youtube api to get a list of my ids
function getPlayListIds() 
{
  var request = gapi.client.youtube.channels.list({
    mine: 'true',
    part: 'contentDetails'
  });
  request.execute(function(response) {
    playlistId = response.items[0].contentDetails.relatedPlaylists.watchHistory;
    getLastVideo(playlistId)
  });
}

function getLastVideo(id)
{
	var options =
		{
			playlistId: id,
			part: 'snippet',
			maxResults: 1
		};

	var request = gapi.client.youtube.playlistItems.list(options);

		request.execute(function(response){
			var lastVideoId = response.result.items[0].snippet.resourceId.videoId;
			renderVideo(lastVideoId);
		})

}

function renderVideo(id)
{
	$("#lastYoutube").append("\
		<iframe width='100%' width='auto' src='http://www.youtube.com/embed/"+id+"'frameborder='0' allowfullscreen></iframe>\
	")
}
