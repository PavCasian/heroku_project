<?php
  include('../shareCode/mysqlLink.php');
 
  $link = connectDB();
  
  if ($link):
    header( 'Location: flank.php' );

 else:
 ?>
       <h4> No connection to MySQL server. Please connect to access the task.</h4>
<?php
endif;
?>
