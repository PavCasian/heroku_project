<?php
define ('DB_HOST', 'mysql.example.com'); //need actual server URL
define ('DB_USER', 'myUsername');  // need actual username
define ('DB_PASSWORD', 'myPassword'); // need actual password
define ('DB_NAME', 'myDB'); //need actual database name
 $link = @mysqli_connect('localhost', 'root', null);
 function connectDB($showMsg=false, $useDB=true) {
	 $currDB = ($useDB) ? DB_NAME : null;
	 $link = @mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, $currDB);
     if($showMsg) { echoMsg($link,'Remote');}
     
	 if(!$link) { //if Failed to connect to the remote server
	    $link = @mysqli_connect('localhost', 'root', null, $currDB);
    	if($showMsg)  { echoMsg($link,'Local');}
	 }
	return $link;
 }
 
 function echoMsg($Lk, $Txt) {
	 echo $Txt . ' MySQL link: ' . ($Lk ? 'OK' : 'Failed') . '<br>';
 }
// for test use '$link = connectDB(true, false);'
 // also for test '@mysqli_close($link);'