<?php
// get all the tasks in the db

require "main_conf.php";

if (isset($_POST['idToDelete']))
{
	$id = $_POST['idToDelete'];
	$con = mysqli_connect($host,$usr,$pw,$db);
	$sql = mysqli_query($con,"DELETE FROM todo WHERE id='$id'");
}


mysqli_close($con);



?>