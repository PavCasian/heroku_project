<?php
 $host="ec2-54-75-246-118.eu-west-1.compute.amazonaws.com";
 $port="5432";
 $dbname="dfettkucil99ap";
 $username="laigntiobbmepw";
 $password="8b077c3cc5ad00b5fc84a68727adecb4436d5b18e1491d3cf1f06e579ca8af13";
 $dsn = "pgsql:host=$host;port=$port;dbname=$dbname;user=$username;password=$password";
 // data source name
 function connectDB($showMess=False) {

	 try{
		// creates the PostgreSQL database connection
		global $dsn;
		$conn = new PDO($dsn);

		// message if connected to the PostgreSQL successfully
		if($conn and $showMess){
		echo "Connected to the database successfully!";
		}
		}catch (PDOException $e){
		// should there be an error lets get that and show it to the user.
		echo $e->getMessage();
		}
	return $conn;
 }

