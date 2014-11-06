<?php
// get all the tasks in the db

$host = 'http://intheon.xyz';
$db = 'intheon_sonos';
$usr = 'intheon_sir';
$pw = 'E3(sHV(P-+]x';


if (isset($_POST['idToDelete']))
{
	$id = $_POST['idToDelete'];
	$con = mysqli_connect($host,$usr,$pw,$db);
	$sql = mysqli_query($con,"DELETE FROM todo WHERE id='$id'");
}


mysqli_close($con);



?>