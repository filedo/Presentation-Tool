// 感想機能の総作成数 一つフォームが作成されるたびに加算される
var cToolNum = 1;
function commentTool(evt) {

	// 1つの感想フォームの固まりとしてdivタグを作成する
	// 初期状態としてドラッグ不可能にしている
	// ドラッグ終了時には灰色の枠線を消し、再びドラッグ不可能な状態に戻す
	// 選択されると赤色の枠線が表示されドラッグ可能になる
	var div = $('<div>').attr({id:"opinion-"+cToolNum}).draggable({
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
	}).css({width:'325px'});

	$('#comments').append(div);
	for(var i = 0;i < 2; i++){
		$('#opinion-'+cToolNum).append(jQuery("<input type='radio' name='opinion"+cToolNum+"' id='opinion"+cToolNum+"-"+(i+1)+"' value='"+(i+1)+"'/><label for='opinion"+cToolNum+"-"+(i+1)+"'>"));
	}
	$('#opinion'+cToolNum+"-1").next().html("：分かりやすかった");
	$('#opinion'+cToolNum+"-2").next().html("：分かりにくかった");

	$('#opinion-'+cToolNum).append(jQuery("<br>"));

	var textarea = $('<textarea>').attr({
		id:"comment"+cToolNum,
		name:"comment"+cToolNum,
		cols:"42.5",
		rows:"6",
		maxlength:"500",
		placeholder:"ご意見・ご感想をご記入ください"
	}).css({resize:'vertical'});

	$('#opinion-'+cToolNum).append(textarea);
	$('#opinion-'+cToolNum).append(jQuery("<br>"));
	$('#opinion-'+cToolNum).append(jQuery("<input type='button'/>").attr({value: "送信する"}));

	cToolNum++;
	evt.preventDefault();
}

