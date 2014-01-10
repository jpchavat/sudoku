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
	}

$ramLow = 80;
$ramHig = 140;
//$ramLow = 1;
//$ramHig = 1;
$times = rand($ramLow, $ramHig);
for($i=0;$i<$times;$i++){
  $aux = rand(0, 4);
  
  //SACAR
  $aux = 4;
  switch ($aux){
    case 0:
//      $matrix = randomizeCols($matrix);
      break;
    case 1:
//      $matrix = randomizeRows($matrix);
      break;
    case 2:
//      $matrix = randomizeSqaCols($matrix);
      break;
    case 3:
//      $matrix = randomizeSqaRows($matrix);
      break;
    case 4:
      $matrixSol = randomizeDigits($matrixSol);
      break;
  }
}


  

/**************************************************
 ***************** REGION TO RAMDOM *****************
 *****************    THE MATRIX    *****************   
 ***************************************************
  
	function ramdomizeDigits(matrix){
		var digit1 = Math.floor(Math.random()*(9))+1;
		var digit2 = Math.floor(Math.random()*(9))+1;
		digit1 = 1;
		digit2 = 2;
		var changed = true;
		for(var i = 0; i < 9 ; i++){
			for(var j = 0; j < 9 ; j++){
				if(matrix[i][j] == digit1 ){
					matrix[i][j] = digit2;
					changed = false;
				}
				if(matrix[i][j] == digit2 && changed){
					matrix[i][j] = digit1;
				}
				changed = true;
			}
		}
		return matrix;
	}

	function ramdomizeSqaCols(matrix){
		var cols = [0,1,2];
		var col1 = cols[Math.floor(Math.random()*(cols.length))];
		cols.remove(col1);
		var col2 = cols[Math.floor(Math.random()*(cols.length))];
		var colTemp1 = [];
		var colTemp2 = [];
		var colTemp3 = [];
		for (var i2 = 0;i2<9;i2++){
			colTemp1[i2] = matrix[i2][(col1*3)];
			colTemp2[i2] = matrix[i2][(col1*3)+1];
			colTemp3[i2] = matrix[i2][(col1*3)+2];
			matrix[i2][(col1*3)]= matrix[i2][(col2*3)];
			matrix[i2][(col1*3)+1]= matrix[i2][(col2*3)+1];
			matrix[i2][(col1*3)+2]= matrix[i2][(col2*3)+2];
			matrix[i2][(col2*3)] = colTemp1[i2];
			matrix[i2][(col2*3)+1] = colTemp2[i2];
			matrix[i2][(col2*3)+2] = colTemp3[i2];
		}
		return matrix;
	}
	
	function ramdomizeSqaRows(matrix){
		var rows = [0,1,2];
		var row1 = rows[ Math.floor(Math.random()*(rows.length)) ];
		rows.remove(row1);
		var row2 = rows[ Math.floor(Math.random()*(rows.length)) ];
		var rowTemp1 = [];
		var rowTemp2 = [];
		var rowTemp3 = [];
		for(var j=0;j<9;j++){
			rowTemp1[j] = matrix[(row1*3)][j];
			rowTemp2[j] = matrix[(row1*3)+1][j];
			rowTemp3[j] = matrix[(row1*3)+2][j];
			matrix[(row1*3)][j] = matrix[(row2*3)][j];
			matrix[(row1*3)+1][j] = matrix[(row2*3)+1][j];
			matrix[(row1*3)+2][j] = matrix[(row2*3)+2][j];
			matrix[(row2*3)][j] = rowTemp1[j];
			matrix[(row2*3)+1][j] = rowTemp2[j];
			matrix[(row2*3)+2][j] = rowTemp3[j];
		}
		return matrix;
	}
	
	function ramdomizeCols(matrix){
		var colSqa = Math.floor(Math.random()*(3)) ;
		var cols = [0,1,2];
		var col1 = cols[Math.floor(Math.random()*(cols.length))];
		cols.remove(col1);
		var col2 = cols[Math.floor(Math.random()*(cols.length))];
		col1 = (colSqa*3) + col1;
		col2 = (colSqa*3) + col2;
		var colTemp = [];
		for (var i2 = 0;i2<9;i2++){
			colTemp[i2] = matrix[i2][col1];
			matrix[i2][col1] = matrix[i2][col2];
			matrix[i2][col2] = colTemp[i2];
		}	
		return matrix;
	}
	
	function ramdomizeRows(matrix){
		var rowSqa =  Math.floor(Math.random()*(3)) ;
		var rows = [0,1,2];
		var row1 = rows[Math.floor(Math.random()*(rows.length))];
		rows.remove(row1);
		var row2 = rows[Math.floor(Math.random()*(rows.length))];
		row1 = (rowSqa*3) + row1;
		row2 = (rowSqa*3) + row2;
		var rowTemp = [];
		for (var j = 0;j<9;j++){
			rowTemp[j] = matrix[row1][j];
			matrix[row1][j] = matrix[row2][j];
			matrix[row2][j] = rowTemp[j];
		}	
		return matrix;
	}
	/********************  END  *************************
	***************\\ REGION TO RAMDOM *****************
	***************\\    THE MATRIX    *****************   
	***************************************************/	


//Esto se saca al procesar la $matrixUsr a partir de la $matrixSol
$matrixUsr = $matrixSol;

echo(json_encode(array('sol' =>$matrixSol,'usr' => $matrixUsr )));

?>