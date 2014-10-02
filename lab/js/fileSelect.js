function fileSelect(evt) {
	// スライドの画像データを読み込む関数
	var arr = new Array();
	// 選択したファイルがFileObjectとしてfilesに代入される
	var files = evt.target.files;

	var reg = /(.*)(?:\.([^.]+$))/;

	var cnt = 1;

	// ファイル数分、arrをobjectで初期化
	for(var i = 0;i < files.length; i++){
		arr[i] = new Object();
	}

	for (var i = 0, f; f = files[i]; i++) {
		// dataURL形式でファイルを読み込む
		var reader = new FileReader();
		// ファイル読み込みに成功すると起こるイベント
		reader.onload = (function(i,theFile) {
			return function(e) {
				// 拡張子を除いたファイル名を取得 1.pngなら1
				var filename = theFile.name.match(reg)[1];
				// img要素を作成し属性セット
				var img = $('<img>').attr({
					class:"step",
					src:e.target.result,
					title:escape(theFile.name),
					zIndex:filename
				});

				// keyをimg要素のzIndex属性、valueをimg要素に設定する
				// localeCompareは1,2,10,13ではなく001,002,010,013と設定しないと、正しい比較ができない
				var key = img.attr('zIndex');
				if(key < 10){
					arr[i].key = '00' + key;
				}else if(key >= 10 && key < 100){
					arr[i].key = '0' + key;
				}
				arr[i].value = img;

				// 最後のファイル読み込みが完了したら、arrを降順でソートしてslideに追加する
				// できればcntを使わず実装したいが、今は方法が思いつかない
				if(cnt == files.length){
					arr.sort(function(a, b) {
						return b.key.localeCompare(a.key);
					});
					for(i = 0; i < arr.length; i++){
						$('#slide').append(arr[i].value);
					}
				}
				cnt++;
			};
		})(i,f);
		reader.readAsDataURL(f);
		//evt.preventDefault();
	}
}