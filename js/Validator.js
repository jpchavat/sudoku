
	function onlyNumbers(event){
		if ( $.inArray(event.keyCode,[46,8,9,116]) !== -1){// Allow: backspace, delete, tab, f5
			if( $.inArray(event.keyCode,[46,8]) !== -1){
				$('#'+event.target.id).val('');
			}
			return;
		}
		else{
			if ( (event.keyCode < 49 || event.keyCode > 57) && (event.keyCode < 97 || event.keyCode > 105 )) {// when is not a number
				event.preventDefault(); 
			} 
			else{
				$('#'+event.target.id).val('');
			}
		}			
	}
	
	function checkErrors(){
		var bool = false;
		for(var i = 1; i < 10; i++){
			for(var j = 1; j < 10; j++){
				if(!$('#R'+i+'C'+j).is(":disabled")){
					$('#R'+i+'C'+j).removeClass( "Red" );
					if(isRepeatedRow('R'+i+'C'+j) || isRepeatedCol('R'+i+'C'+j) || isRepeatedSqa('R'+i+'C'+j) ){
						$('#R'+i+'C'+j).addClass( "Red" );
						bool = true;
					}
				}
			}
		}
		return bool;
	}
	
	function isRepeatedRow(id){
		var row = id.charAt(1);
		var bool = false;
		for(var i = 1; i < 10; i++){
			if( ($("#R"+row+"C"+i).val() == $("#"+id).val()) && ("R"+row+"C"+i  != id) && ($("#"+id).val() != '')  ){
				//console.log('rep row:'+id);
				bool = true;
				i=10;
			}
		}
		return bool;
	}
	
	function isRepeatedCol(id){
		var col = id.charAt(3);
		var bool = false;
		for(var i = 1; i < 10; i++){
			if( ($("#R"+i+"C"+col).val() == $("#"+id).val()) && ("R"+i+"C"+col  != id ) && ($("#"+id).val() != '') ){
				//console.log('rep col:'+id);
				bool = true;
				i=10;
			}
		}
		return bool;
	}
	
	function isRepeatedSqa(id){
		var row = parseInt(id.charAt(1)); 	
		var col = parseInt(id.charAt(3));
		var bool = false;
		while (row % 3 != 0){
			row += 1;
		}	
		while (col % 3 != 0){
			col += 1;		
		}	
		for(var i = (row-2) ; i < (row+1) ; i++){
			for(var j = (col-2); j < (col+1); j++){	
				if( ($("#R"+i+"C"+j).val() == $("#"+id).val()) && ("R"+i+"C"+j  != id ) && ($("#"+id).val() != '') ){
					//console.log('rep sqa:'+id);
					bool = true;
					i=10;
					j=10;			
				}
			
			}
		}
		return bool;
	}
