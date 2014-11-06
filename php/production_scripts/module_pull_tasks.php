<?php
// get all the tasks in the db

$host = 'http://intheon.xyz';
$db = 'intheon_sonos';
$usr = 'intheon_sir';
$pw = 'E3(sHV(P-+]x';
$con = mysqli_connect($host,$usr,$pw,$db);

	$json = array();

	$data = mysqli_query($con,'SELECT * FROM todo');

	while($r = mysqli_fetch_assoc($data))
	{
		$json[] = $r;
	}
	
	echo json_encode($json);


// 		$data = mysqli_query($con,'SELECT task FROM todo ORDER BY id DESC LIMIT 0, 1');

mysqli_close($con);



?>