// 利用可能なキーイベントをまとめた関数
// case 39,37はスライドを移動させるためのキー
// case 68は選択されたフォーム（アンケートフォームや感想フォーム）を削除するためのキー
// $function()はjqueryのAPIを使える

// 要素のidと選択されたか否かを記録する変数
// ある要素が選択された場合の例：["opinion-1",true]
var selectedId = ["id",false];

/**
フォームをスライドごとにセットする方法
1.キーと値の配列を作る
2.フォームをセットした時、フォームidと現在のスライドidをキーと値として関連づける
3.スライドを移動した時、現在のスライドidを取得し、配列を全て検索してスライドidと関連づけられているフォームidが存在するか調べる
4.存在すればそのフォームを表示させる
5.それ以外のフォームは非表示にする
**/

//1.キーと値の配列を作る （変数名が思いつかない）
var slideIdAndFormId = {};
$(function(){
	// キーイベント処理
	$(window).keyup(function(e){
		switch(e.which){

			// →を押したら最後の要素を#slideの先頭に追加（移動）させる
			case 39:
			$('#slide').prepend($("#slide").find(":last"));
			// 3.スライドを移動した時、現在のスライドidを取得し、
			// 配列を全て検索してスライドidと関連づけられているフォームidが存在するか調べる
			var key = $("#slide").find(":last").attr("zIndex");
			for (var keyString in slideIdAndFormId) {
				// 4.存在すればそのフォームを表示させる
				// 5.それ以外のフォームは非表示にする
				if(key == keyString){
					$("#"+slideIdAndFormId[keyString]).css("visibility","visible");
				}else{
					$("#"+slideIdAndFormId[keyString]).css("visibility","hidden");
				}
			}
			break;

			// ←を押したら最初の要素を#slideの末尾に追加（移動）させる
			case 37:
			$('#slide').append($("#slide").find(":first"));
			// 以下case39と同様
			var key = $("#slide").find(":last").attr("zIndex");
			for (var keyString in slideIdAndFormId) {
				if(key == keyString){
					$("#"+slideIdAndFormId[keyString]).css("visibility","visible");
				}else{
					$("#"+slideIdAndFormId[keyString]).css("visibility","hidden");
				}
			}
			break;

			// フォームが選択された状態でdを押すと要素が削除される
			case 68:
			if(selectedId[1]==true){
				$('#'+selectedId[0]).remove();
				// 要素が削除されたのでselectedIdを初期化
				selectedId = ["id",false];
			}
			break;

			// フォームが選択された状態でEnterを押すと現在のスライドにそのフォームが設定される
			case 13:
			if(selectedId[1]==true){
				// 2.フォームをセットした時、キーを現在のスライドid、値をフォームidとして関連づける
				var key = $("#slide").find(":last").attr("zIndex");
				var value = $('#'+selectedId[0]).attr("id");
				slideIdAndFormId[key] = value;
				// 要素が削除されたのでselectedIdを初期化
				selectedId = ["id",false];
				alert("選択中のフォームを現在のスライドにセットしました。")
			}
			break;
		}
	});
});
