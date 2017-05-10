<?php
// Including database connections
require_once 'database_connections.php';
// Fetching and decoding the inserted data
$data = json_decode(file_get_contents("php://input"));
// Escaping special characters from submitting data & storing in new variables.
$suggestion = mysqli_real_escape_string($con, $data->sugg_text);

// mysqli insert query
$query = "INSERT into suggestions (suggestion) VALUES ('$suggestion')";
// Inserting data into database
mysqli_query($con, $query);
echo true;
?>

