// スライドを降順でソートする関数
function sortTool(evt) {
	var arr = new Array();

	for (var i = 0, len = questionList.length; i < len; i++) {
		console.log(questionList[i]);
	}
	for (var i = 0, len = commentList.length; i < len; i++) {
		console.log(commentList[i]);
	}

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
		$('#slide').append(arr[i].value);
	}

	// このメソッドが呼ばれると、通常実行されるアクションがキャンセルされる
	// 例えばaタグのリンクをクリックすると通常はページが遷移するが、その処理をキャンセルできる
	evt.preventDefault();

}