<?php
// this will read xml and send it back to javascript
// it takes an argument of a url of a valid site that serves xml
// copyright 2014 intheon
$entries = array();
$count = 0;

if (isset($_POST['website']))
{
	$url_param = $_POST['website'];
	$website = $_POST['tagline'];
	$limit = $_POST['quant'];
	// once we have the url parameters, process to parse the biatch.

	$xml = simplexml_load_file($url_param);
	// simplexml_load_file is useful as it will just get the thing we want

	foreach($xml as $key)
	{
		$entries = array_merge($entries, $xml->xpath("//item"));
	}

	// i get back an object
	// the above loops through, and merges each entry onto an empty array
	// the magic is in the xpath, it digs into the xml and grabs only those elements and children
}

// i get one lovely big string which i can play with
// if its a bash quote introduce some randomness.

if($website == "bash")
{
	$offset = mt_rand(0,45);
}
else
{
	$offset = 0;
}

$chopped = array_slice($entries,$offset,$limit);

echo json_encode($chopped);


?>