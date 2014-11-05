<?php
// get all the tasks in the db

$host = 'localhost';
$db = 'todo';
$usr = 'root';
$pw = '';
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