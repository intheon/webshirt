<?php
// get all the tasks in the db

$host = 'localhost';
$db = 'todo';
$usr = 'root';
$pw = '';
$con = mysqli_connect($host,$usr,$pw,$db);

if (isset($_GET['isLim']))
{
	$json = array();

	$lim = $_GET['isLim'];

	echo $lim;

	if ($lim == false)
	{
		$data = mysqli_query($con,'SELECT * FROM todo');

		while($r = mysqli_fetch_assoc($data))
		{
		$json[] = $r;
		}
	
		echo json_encode($json);
	}
	else if ($lim ==  true)
	{
		$data = mysqli_query($con,'SELECT task FROM todo ORDER BY id DESC LIMIT 0, 1');
	}

}




mysqli_close($con);



?>