var arr = new Array();
function sort(evt) {
	var files = evt.target.files;//選択したファイルがFileObjectとしてfilesに代入される
	//var output = [];
	var reg=/(.*)(?:\.([^.]+$))/;


		var reader = new FileReader();


		$('#slide figure').each(function(i){
			console.log( $(this).attr('id') );
			arr[i] = new Object();
			console.log(i);
			// a要素のtitle属性の値をkeyにセット。
			//arr[i].key = $("#", this).attr('z-index');
			// li要素をvalueにセット。
			//arr[i].value = $(this);
		//	$('#slide').prepend($("#slide").find(":last"));

		});
		//console.log(arr);
		//arr.sort(sortDesc);
		//for(i = 0; i < arr.length; i++){
		//	$("#slide figure").append(arr[i].value);
		//}


	// "key"プロパティで降順ソートする関数
	//var sortDesc = function(a, b) {
	//	return b.key.localeCompare(a.key);
	//}
  }