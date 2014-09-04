// 利用可能なキーイベントをまとめた関数
// case 39,37はスライドを移動させるためのキー
// case 68は選択されたツール（アンケートフォームや感想フォーム）を削除するためのキー
// $function()はjqueryのAPIを使える

// 要素のidと選択されたか否かを記録する変数
// ある要素が選択された場合の例：["opinion-1",true]
var selectedId = ["id",false];
$(function(){
	// キーイベント処理
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

			// ツールが選択された状態でdを押すと要素が削除される
			case 68:
			if(selectedId[1]==true){
				$('#'+selectedId[0]).remove();
				// 要素が削除されたのでselectedIdを初期化
				selectedId = ["id",false];
			}
			break;
		}
	});
});
