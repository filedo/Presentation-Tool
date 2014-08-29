// キーイベントを取得して、スライドのページをめくる関数
// $function()はjqueryのAPIを使える
$(function(){
	// スライドを移動させるためのキーイベント処理
	$(window).keyup(function(e){
		switch(e.which){
			// →を押したら最後の要素を#slideの先頭に追加（移動）させる
			case 39:
			$('#slide').prepend($("#slide").find(":last"));
			break;

			// ←を押したら最初の要素を#slideの末尾に追加（移動）させる
			case 37:
			$('#slide').append($("#slide").find(":first"));
			break;
		}
	});
});