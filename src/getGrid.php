<?php 
// Prevent caching.
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 01 Jan 1996 00:00:00 GMT');

// The JSON standard MIME header.
header('Content-type: application/json');

$matrixSol = array(
            array(1,2,3,	4,5,6,	7,8,9),
						  array(4,5,6,	7,8,9,	1,2,3),
						  array(7,8,9,	1,2,3,	4,5,6), 
						  
						  array(2,3,4,	5,6,7,	8,9,1),
						  array(5,6,7,	8,9,1,	2,3,4),
						  array(8,9,1,	2,3,4,	5,6,7),
						  
						  array(3,4,5,	6,7,8,	9,1,2),
						  array(6,7,8,	9,1,2,	3,4,5),
						  array(9,1,2,	3,4,5,	6,7,8)
					  );
$matrixUsr = array(
              array(1,'',3,	4,'',6,	7,8,9),
						  array(4,5,6,	7,8,9,	1,2,3),
						  array(7,8,9,	1,2,3,	4,5,6), 
						  
						  array(2,3,4,	5,6,7,	8,9,1),
						  array(5,'',7,	8,9,1,	2,3,4),
						  array(8,9,1,	2,3,4,	5,6,7),
						  
						  array(3,4,5,	6,7,8,	9,1,2),
						  array(6,7,8,	9,1,2,	3,4,5),
						  array(9,1,2,	3,4,5,	6,'',8)
					  );

echo(json_encode(array('sol' =>$matrixSol,'usr' => $matrixUsr )));//$matrixSol));

?>