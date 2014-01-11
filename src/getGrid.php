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


  /**************************************************
   ***************** REGION TO RAMDOM *****************
   *****************    THE MATRIX    *****************   
   ***************************************************/

  $ramLow = 80;
  $ramHig = 140;
  $times = rand($ramLow, $ramHig);
  for($i=0;$i<$times;$i++){
    $aux = rand(0, 4);

    switch ($aux){
      case 0:
        $matrixSol = randomizeCols($matrixSol);
        break;
      case 1:
        $matrixSol = randomizeRows($matrixSol);
        break;
      case 2:
        $matrixSol = randomizeSqaCols($matrixSol);
        break;
      case 3:
        $matrixSol = randomizeSqaRows($matrixSol);
        break;
      case 4:
        $matrixSol = randomizeDigits($matrixSol);
        break;
    }
  }

  function randomizeDigits($matrix){
		$digit1 = rand(1, 9);
    do{
      $digit2 = rand(1, 9);
    }while($digit2==$digit1);
		$changed = true;
		for($i = 0; $i < 9 ; $i++){
			for($j = 0; $j < 9 ; $j++){
				if($matrix[$i][$j] == $digit1 ){
					$matrix[$i][$j] = $digit2;
					$changed = false;
				}
				if(($matrix[$i][$j] == $digit2) && $changed){
					$matrix[$i][$j] = $digit1;
				}
				$changed = true;
			}
		}
		return $matrix;
	};
  
  function randomizeSqaCols($matrix){
		$cols = array(0,1,2);
    $col1 = $cols[rand(0, count($cols)-1)];
    unset($cols[array_search($col1, $cols)]);
		$col2 = $cols[rand(0, count($cols)-1)];
    
		for ($i = 0; $i<9; $i++){
			$colTemp1 = $matrix[$i][($col1*3)];
			$colTemp2 = $matrix[$i][($col1*3)+1];
			$colTemp3 = $matrix[$i][($col1*3)+2];
			$matrix[$i][($col1*3)] = $matrix[$i][($col2*3)];
			$matrix[$i][($col1*3)+1]= $matrix[$i][($col2*3)+1];
			$matrix[$i][($col1*3)+2]= $matrix[$i][($col2*3)+2];
			$matrix[$i][($col2*3)] = $colTemp1;
			$matrix[$i][($col2*3)+1] = $colTemp2;
			$matrix[$i][($col2*3)+2] = $colTemp3;
		}
		return $matrix;
	}
  
	function randomizeSqaRows($matrix){
		$rows = array(0,1,2);
		$row1 = $rows[rand(0, count($rows)-1)];
    unset($rows[array_search($row1, $rows)]);
		$row2 = $rows[rand(0, count($rows)-1)];
		for($j=0; $j<9; $j++){
			$rowTemp1 = $matrix[($row1*3)][$j];
			$rowTemp2 = $matrix[($row1*3)+1][$j];
			$rowTemp3 = $matrix[($row1*3)+2][$j];
			$matrix[($row1*3)][$j] = $matrix[($row2*3)][$j];
			$matrix[($row1*3)+1][$j] = $matrix[($row2*3)+1][$j];
			$matrix[($row1*3)+2][$j] = $matrix[($row2*3)+2][$j];
			$matrix[($row2*3)][$j] = $rowTemp1;
			$matrix[($row2*3)+1][$j] = $rowTemp2;
			$matrix[($row2*3)+2][$j] = $rowTemp3;
		}
		return $matrix;
	}
  
  function randomizeCols($matrix){
		$colSqa = rand(0,2);
		$cols = array(0,1,2);    
		$col1 = $cols[rand(0, count($cols)-1)];
    unset($cols[array_search($col1, $cols)]);
		$col2 = $cols[rand(0, count($cols)-1)];
		$col1 = ($colSqa*3) + $col1;
		$col2 = ($colSqa*3) + $col2;
		for ($i2 = 0;$i2<9;$i2++){
			$colTemp = $matrix[$i2][$col1];
			$matrix[$i2][$col1] = $matrix[$i2][$col2];
			$matrix[$i2][$col2] = $colTemp;
		}	
		return $matrix;
	}
	
	function randomizeRows($matrix){
		$rowSqa =  rand(0,2);
		$rows = array(0,1,2);
		$row1 = $rows[rand(0, count($rows)-1)];
    unset($rows[array_search($row1, $rows)]);
		$row2 = $rows[rand(0, count($rows)-1)];
		$row1 = ($rowSqa*3) + $row1;
		$row2 = ($rowSqa*3) + $row2;
		for ($j = 0;$j<9;$j++){
			$rowTemp = $matrix[$row1][$j];
			$matrix[$row1][$j] = $matrix[$row2][$j];
			$matrix[$row2][$j] = $rowTemp;
		}	
		return $matrix;
	}
  
	/********************  END  *************************
	***************\\ REGION TO RAMDOM *****************
	***************\\    THE MATRIX    *****************   
	***************************************************/	


//TODO
//Esto se saca al procesar la $matrixUsr a partir de la $matrixSol
$matrixUsr = $matrixSol;

echo(json_encode(array('sol' =>$matrixSol,'usr' => $matrixUsr )));

?>