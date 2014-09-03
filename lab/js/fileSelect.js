// スライドの画像データを読み込む関数
var arr = new Array();
function fileSelect(evt) {
	// 選択したファイルがFileObjectとしてfilesに代入される
	var files = evt.target.files;
	// var output = [];
	var reg=/(.*)(?:\.([^.]+$))/;

	for (var i = 0, f; f = files[i]; i++) {
		// output.push(f.name);
		// dataURL形式でファイルを読み込む
		var reader = new FileReader();

		reader.onload = (function(theFile) {
			return function(e) {
				// 拡張子を除いたファイル名を取得　1.pngなら1
				var filename = theFile.name.match(reg)[1];

				// img要素を作成し属性をセット
				var img = $('<img>').attr({
					class:"step",
					src:e.target.result,
					title:escape(theFile.name),
					zIndex:filename
				});
				$('#slide').prepend(img);
			};
		})(f);
		reader.readAsDataURL(f);
		//evt.preventDefault();
	}
	/*
	//すべてを読み込む前にソートしてしまうのでうまく動作しない
	reader.onloadend = (function(){
		var arr = new Array();

		// img要素をすべて取り出しarrにセットする
		$('#slide img').each(function(i){
			arr[i] = new Object();

			// img要素のzIndex属性の値をkeyにセット。
			// localeCompareは1,2,10,13ではなく001,002,010,013と設定しないと、正しい比較ができない
			var key = $(this).attr('zIndex');
			if(key < 10){
				arr[i].key = '00' + key;
			}else if(key >= 10 && key < 100){
				arr[i].key = '0' + key;
			}
			// img要素をvalueにセット。
			arr[i].value = $(this);
		});
		// "key"プロパティで降順ソートする関数
		arr.sort(function(a, b) {
			return b.key.localeCompare(a.key);
		});
		// 降順されたimg要素をすべてslideに追加する
		for(i = 0; i < arr.length; i++){
			$("#slide").append(arr[i].value);
		}
	});
*/
}