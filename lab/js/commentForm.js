// 感想機能の総作成数 一つフォームが作成されるたびに加算される
var cFormNum = 1;
// アンケートの選択内容とコメントの入力内容を格納するリスト
// 例:[ ["1",あいうえお] , ["2",かきくけこ] , ...]
var commentList = [];
function commentForm(evt) {

	// 1つの感想フォームの固まりとしてdivタグを作成する
	// 初期状態としてドラッグ不可能にしている
	// ドラッグ終了時には灰色の枠線を消し、再びドラッグ不可能な状態に戻す
	// 選択されると赤色の枠線が表示されドラッグ可能になる
	var div = $('<div>').attr({id:"opinion-"+cFormNum}).draggable({
		stop:function(e,ui){
			$(this).css({
				border:''
			}).draggable('disable');
			selectedId = [this.id,false];
		}
	}).draggable('disable').selectable({
		selected:function(e,ui){
			$(this).css({
				border:'solid 1px red'
			}).draggable('enable');
			selectedId = [this.id,true];
		}
	}).css({width:'325px','text-align':'center'});

	$('#comments').append(div);

	for(var i = 0;i < 2; i++){
		$('#opinion-'+cFormNum).append(jQuery("<input type='radio' name='opinion"+cFormNum+"' id='opinion"+cFormNum+"-"+(i+1)+"' value='"+(i+1)+"'/><label for='opinion"+cFormNum+"-"+(i+1)+"'>"));
	}


	$('#opinion'+cFormNum+"-1").next().html("：分かりやすかった");
	$('#opinion'+cFormNum+"-2").next().html("：分かりにくかった");

	$('#opinion-'+cFormNum).append(jQuery("<br>"));

	var textarea = $('<textarea>').attr({
		id:"comment"+cFormNum,
		name:"comment"+cFormNum,
		cols:"42.5",
		rows:"6",
		maxlength:"500",
		placeholder:"ご意見・ご感想をご記入ください"
	}).css({resize:'vertical'});

	// どのボタンが選択されたかチェックするためにボタンのnameを記録
	var name = 'opinion'+cFormNum;

	$('#opinion-'+cFormNum).append(textarea);
	$('#opinion-'+cFormNum).append(jQuery("<br>"));
	$('#opinion-'+cFormNum).append(jQuery("<input type='button'/>").attr({value: "送信する"}).click(function(){
		if (!$("input[name="+name+"]:checked").val()) {
			alert("未選択です。");
		} else {
			// テキストエリアの入力内容を取得
			console.log($("input[name="+name+"]:checked").val(),textarea.val());
			var tmp = [$("input[name="+name+"]:checked").val(),textarea.val()];
			commentList.push(tmp);
		}
	}));

	cFormNum++;
	evt.preventDefault();
}

