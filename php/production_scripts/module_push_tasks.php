<?php
// get all the tasks in the db

$host = 'http://intheon.xyz';
$db = 'intheon_sonos';
$usr = 'intheon_sir';
$pw = 'E3(sHV(P-+]x';
$con = mysqli_connect($host,$usr,$pw,$db);

if (isset($_POST['taskText']))
{
	$taskText = $_POST['taskText'];
	$sql = mysqli_query($con,"INSERT INTO todo (task, done) VALUES ('$taskText',0)");
}

mysqli_close($con);

?>