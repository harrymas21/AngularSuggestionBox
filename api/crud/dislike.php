<?php
// Including database connections
require_once 'database_connections.php';
// Fetching the updated data & storin in new variables
$data = json_decode(file_get_contents("php://input"));
// Escaping special characters from updated data
$sid = mysqli_real_escape_string($con, $data->sid);

// mysqli query to insert the updated data
$query = "UPDATE suggestions SET dislike=dislike+1 WHERE sid=$sid";
mysqli_query($con, $query);
echo true;
?>

