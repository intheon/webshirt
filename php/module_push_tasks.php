<?php
// get all the tasks in the db

$host = 'localhost';
$db = 'todo';
$usr = 'root';
$pw = '';
$con = mysqli_connect($host,$usr,$pw,$db);

if (isset($_POST['taskText']))
{
	$taskText = $_POST['taskText'];
	$sql = mysqli_query($con,"INSERT INTO todo (task, done) VALUES ('$taskText',0)");
}

mysqli_close($con);

?>