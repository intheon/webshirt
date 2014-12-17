<?php
// get all the tasks in the db

require "main_conf.php";

if (isset($_POST['taskText']))
{
	$taskText = $_POST['taskText'];
	$sql = mysqli_query($con,"INSERT INTO todo (task, done) VALUES ('$taskText',0)");
}

mysqli_close($con);

?>