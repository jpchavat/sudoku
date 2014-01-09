	//i=mueve vertical, j=mueve horizontal

	
	
	
	function solveSudoku(){
		var matrix = getMatrixfromHtml();
		var posValsmatrix = getMatrixPosibilities(matrix);
		
		
		//console.log(findNakedCell(posValsmatrix));
		
		
		
		
	}
	

	function findNakedCell(posValsmatrix){
		var positions = [];
		for(var i=0;i<9;i++){
			for(var j=0;j<9;j++){
				if(posValsmatrix[i][j].length == 1){
					positions = [i,j];
					i=10;
					j=10;
				}
			}
		}
		return positions;
	}
	
	function getMatrixPosibilities(matrix){
		var matPos = [];
		for(var i = 0; i<9;i++){
			var cols = [];
			for(var j = 0; j<9;j++){
				cols[j]=getPosiblesNumbersByCel(matrix, i, j);
			}
			matPos[i] = cols;
		}
		return matPos;
	}

	function isGridFull(matrix){
		var aux = true;
		for(var i = 0; i<9;i++){
			for(var j = 0; j<9;j++){
				if(matrix[i][j] == ''){
					aux = false;
				}
			}
		}
		return aux;
	}

	function getMatrixfromHtml(){
		var matrix = [];	
		for(var i=1;i<10;i++){
			var row = [];
			for(var j=1;j<10;j++){
				if($('#R'+i+'C'+j).is(":disabled")){
					row[j-1] = parseInt($('#R'+i+'C'+j).val());		
				}
				else{
					row[j-1] = '';
				}
			}
			matrix[i-1] = row;
		}
		return matrix;
	}	

	function getPosiblesNumbersByCel(matrix, iparam, jparam){
		var numList = [1,2,3,4,5,6,7,8,9];
		for (var j = 0; j < 9;j++){//check in ROW
			if(matrix[iparam][j] != ''){
				numList.remove(matrix[iparam][j]);
			}
		}
		for (var i = 0; i < 9;i++){//check in COL
			if(matrix[i][jparam] != ''){
				numList.remove(matrix[i][jparam]);
			}
		}	
		iparam+=1;//matrix starts in 0
		jparam+=1;//matrix starts in 0
		while (iparam % 3 != 0){
			iparam += 1;
		}	
		while (jparam % 3 != 0){
			jparam += 1;		
		}		
		for(var i = (iparam-3) ; i < (iparam) ; i++){//check Sqa
			for(var j = (jparam-3); j < (jparam); j++){	
				if(matrix[i][j] != ''){
					numList.remove(matrix[i][j]);
				}	
			}
		}
		return numList;
	}




	/***************************************************
	***************** REGION TO CREATE *****************
	*****************    THE MATRIX    *****************   
	***************************************************/
	function createTable(){
		var table = $('<table cellspacing="0" cellpadding="0" ><tbody>');
		for(var i = 1; i < 10; i++){
			var tr = $('<tr>');	
			for (var j = 1; j < 10; j++){
				var td = $('<td>');		
				if ( (j==1) || (j==4) || (j==7) ) {
					td.addClass('Left');
				}
				if ( (j==9) ) {
					td.addClass('Right');
				}
				if ( (i==1) || (i==4) || (i==7) ) {
					td.addClass('Top');
				}
				if ( (i==9) ) {
					td.addClass('Bottom');
				}				
        var classBG = 'Even';
        if (($.inArray(i,[1,2,3,7,8,9])>-1 && $.inArray(j,[4,5,6])>-1)
              || 
            ($.inArray(i,[4,5,6])>-1 && $.inArray(j,[1,2,3,7,8,9])>-1)
            ){
          classBG = 'Odd';
        };
				$('<input />').attr({'type':'text', 'id':'R'+i+'C'+j, 'class': classBG  }).appendTo(td);
				td.appendTo(tr);
			}
			tr.appendTo(table);
		}
		table.appendTo('#SudGame');
		var butt = $('<button/>', {
						text: 'solve',
						id: 'btn',
						click: function () { solveSudoku(); }
					}); 
		butt.appendTo('#SudGame');
		tableValidations();
	}
	
	function tableValidations(){
		for(var i = 1; i < 10; i++){
			for (var j = 1; j < 10; j++){
				$("#R"+i+"C"+j).attr('maxlength','1');
				$("#R"+i+"C"+j).keydown(function(event) {onlyNumbers(event)});
				$("#R"+i+"C"+j).keyup(function() {checkErrors()});
				$("#R"+i+"C"+j).val('').addClass( "Basic" );
			}
		}	
	}

	function assignGrid(matrix){
		for(var i = 1; i < 10; i++){
			for(var j = 1; j < 10; j++){
				if (matrix[i-1][j-1]!= ''){
					$("#R"+i+"C"+j).val(matrix[i-1][j-1]).addClass( "Given" );
					$("#R"+i+"C"+j).attr('disabled','disabled');
				}	
			}
		}
	}

	function createGrid(){
    var matrix;
    
    
    $.ajax({
            type: 'POST',
            url: 'src/getGrid.php',
            format: 'JSON',
            async: false
          }).done(function(data){
            matrix = data.usr;
            //console.log(data);
          });
          
          
		/*var matrix = [
						  [1,'',3,	4,'',6,	7,8,9],
						  [4,5,6,	7,8,9,	1,2,3],
						  [7,8,9,	1,2,3,	4,5,6], 
						  
						  [2,3,4,	5,6,7,	8,9,1],
						  [5,'',7,	8,9,1,	2,3,4],
						  [8,9,1,	2,3,4,	5,6,7],
						  
						  [3,4,5,	6,7,8,	9,1,2],
						  [6,7,8,	9,1,2,	3,4,5],
						  [9,1,2,	3,4,5,	6,7,8]
					  ];*/
		
		var ramLow = 80; var ramHig = 140;
		var ramLow = 0; var ramHig = 0;
		var times = Math.floor(Math.random()*(ramHig-ramLow)) +ramLow;
		for(var i=0;i<times;i++){
			var auxRam = [0,1,2,3,4];
			var aux = auxRam[Math.floor(Math.random()*(auxRam.length))];
			switch (aux) {
				case 0:
					matrix = ramdomizeCols(matrix);
				break;
				case 1:
					matrix = ramdomizeRows(matrix);
				break;
				case 2:
					matrix = ramdomizeSqaCols(matrix);
				break;
				case 3:
					matrix = ramdomizeSqaRows(matrix);
				break;
				case 4:
					matrix - ramdomizeDigits(matrix);
				break;
			}
		}
		return matrix;
	}
	/***************************************************
	***************\\ REGION TO CREATE *****************
	***************\\    THE MATRIX    *****************   
	***************************************************/



	/***************************************************
	***************** REGION TO RAMDOM *****************
	*****************    THE MATRIX    *****************   
	***************************************************/	
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
	/***************************************************
	***************\\ REGION TO RAMDOM *****************
	***************\\    THE MATRIX    *****************   
	***************************************************/	

	Array.prototype.remove = function() {
		var what, a = arguments, L = a.length, ax;
		while (L && this.length) {
			what = a[--L];
			while ((ax = this.indexOf(what)) !== -1) {
				this.splice(ax, 1);
			}
		}
		return this;
	};		
