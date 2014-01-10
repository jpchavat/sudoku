	//i=mueve vertical, j=mueve horizontal

	
	function solveSudoku(){
		var matrix = getMatrixfromHtml();
		var posValsmatrix = getMatrixPosibilities(matrix);
		
		console.log('Tablero solucionado');
		
	}
  
	function newSudoku(){
    console.log('Nuevo tablero.');		
    drawTable();
    assignGrid(createGrid());
  	
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

  function drawTable(){
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
		$('#SudGame').html(table);
    
    tableValidations();
  }


	/***************************************************
	***************** REGION TO CREATE *****************
	*****************    THE MATRIX    *****************   
	***************************************************/
	function createTable(){
		drawTable();
		var buttNew = $('<button/>', {
						text: 'New Game',
						id: 'btnNew',
						click: function () { newSudoku(); }
					}); 
		buttNew.appendTo('#SudControl');
		var buttSolve = $('<button/>', {
						text: 'Solve',
						id: 'btnSolve',
						click: function () { solveSudoku(); }
					}); 
		buttSolve.appendTo('#SudControl');
		
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
          console.log('Llamado AJAX a nuevo tablero ok.');
        }).fail(function(){
          console.error('Error en llado AJAX a nuevo tablero.')
        });
	
		return matrix;
	}
	/***************************************************
	***************\\ REGION TO CREATE *****************
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
