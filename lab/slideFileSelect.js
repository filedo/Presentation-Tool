var arr = new Array();
function slideFileSelect(evt) {
	var files = evt.target.files;//選択したファイルがFileObjectとしてfilesに代入される
	//var output = [];
	var reg=/(.*)(?:\.([^.]+$))/;


	for (var i = 0, f; f = files[i]; i++) {
		//output.push(f.name);
		//dataURL形式でファイルを読み込む
		var reader = new FileReader();

		reader.onload = (function(theFile) {
			return function(e) {
				//拡張子を除いたファイル名を取得　1.pngなら1
				var filename = theFile.name.match(reg)[1];
				var figure = document.createElement("figure");
				figure.id=filename;
				figure.innerHTML=['<img class="step" src="', e.target.result,'" title="', escape(theFile.name),'" z-index:',filename,'/>'].join('');
				//figure要素を作成しinnerHTMLにimgを追加しid:slideの子要素
				//var figure = $('<figure>').html( ['<img class="step" src="', e.target.result,'" title="', escape(theFile.name),'" z-index:',filename,'/>'].join(''));
				//figure.id = filename;
				//var figure = $('<figure>').html( ['<img class="step" src="', e.target.result,'" title="', escape(theFile.name),'" name="slide" z-index:',filename,' onclick="slideChange(',filename,');"/>'].join(''));
				$('#slide').prepend(figure);
			};
		})(f);
		reader.readAsDataURL(f);
	}
	/*reader.onloadend = (function(){
		console.log($('#slide').children());
		$('#slide figure img').each(function(i){
			//alert( $(this).attr("z-index") );
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
	});

	// "key"プロパティで降順ソートする関数
	//var sortDesc = function(a, b) {
	//	return b.key.localeCompare(a.key);
	//}
	*/
  }