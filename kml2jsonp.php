<?php

if (!$_GET["callback"] || !$_GET["url"]) {
	header("Status: 500 Internal Server Error");
	return;
}

$callback = $_GET['callback'];
$filename = urldecode($_GET['url']);
$lf = $_GET['lf'];

// do not allow traversal
if (substr($filename, 0, 4) != "http" || strstr($filename, "../") !== FALSE || strstr($filename, "..\\") !== FALSE) {
	header("Status: 500 Internal Server Error");
	return;
}

$opts = array(
  'http'=>array(
    'method'=>"GET"
  )
);
$context = stream_context_create($opts);

$kml = file_get_contents($filename, false, $context);
if ($kml === FALSE) {
	header("Status: 500 Internal Server Error");
	return;
}

if ($lf == "1") {
	$kml = str_replace("\r", "", $kml);
	$kml = str_replace("\n", "\\n", $kml);
} else {
	$kml = str_replace(array("\r\n", "\r", "\n"), "", $kml);
}
$kml = str_replace("\\", "\\\\", $kml);
$kml = str_replace("\"", "\\\"", $kml);
header('Content-Type: application/javascript');
print($callback . "({ \"data\": \"" . $kml . "\" });");

?>
