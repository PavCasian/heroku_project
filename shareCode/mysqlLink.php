<?php


 function connectDB() {
	 $db = parse_url(getenv("postgres://laigntiobbmepw:8b077c3cc5ad00b5fc84a68727adecb4436d5b18e1491d3cf1f06e579ca8af13"+
                       "@ec2-54-75-246-118.eu-west-1.compute.amazonaws.com:5432/dfettkucil99ap"));

	$pdo = new PDO("pgsql:" . sprintf(
		"host=%s;port=%s;user=%s;password=%s;dbname=%s",
		$db["host"],
		$db["port"],
		$db["user"],
		$db["pass"],
		ltrim($db["path"], "/")
	));
     
	return $pdo;
 }
 
 function echoMsg($Lk, $Txt) {
	 echo $Txt . ' MySQL link: ' . ($Lk ? 'OK' : 'Failed') . '<br>';
 }
