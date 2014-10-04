// 感想機能の総作成数 一つフォームが作成されるたびに加算される
// commentFormNumber(cfn)
var cfn = 1;
// アンケートの選択内容とコメントの入力内容を格納するリスト
// 例:[ ["1",あいうえお] , ["2",かきくけこ] , ...]
//var commentList = [];
function commentForm(evt) {
	// 1つの感想フォームの固まりとしてdivタグを作成する
	// 初期状態としてドラッグ不可能にしている
	// ドラッグ終了時には灰色の枠線を消し、再びドラッグ不可能な状態に戻す
	// 選択されると赤色の枠線が表示されドラッグ可能になる
	var div = $('<div>').attr({id:"opinion"+cfn,name:"opinion",cfn:cfn}).draggable({
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
		$('#opinion'+cfn).append(jQuery("<input type='radio' name='opinion"+cfn+"' id='opinion"+cfn+"-"+(i+1)+"' value='"+(i+1)+"'/><label for='opinion"+cfn+"-"+(i+1)+"'>"));
	}


	$('#opinion'+cfn+"-1").next().html("：分かりやすかった");
	$('#opinion'+cfn+"-2").next().html("：分かりにくかった");

	$('#opinion'+cfn).append(jQuery("<br>"));

	var textarea = $('<textarea>').attr({
		id:"comment"+cfn,
		name:"comment"+cfn,
		cols:"42.5",
		rows:"6",
		maxlength:"500",
		placeholder:"ご意見・ご感想をご記入ください"
	}).css({resize:'vertical'});

	// どのボタンが選択されたかチェックするためにボタンのnameを記録
	var name = 'opinion'+cfn;

	$('#opinion'+cfn).append(textarea);
	$('#opinion'+cfn).append(jQuery("<br>"));
	$('#opinion'+cfn).append(jQuery("<input type='button'/>").attr({value: "送信する",id: "cSubmit"+cfn}).click(function(){
		if (!$("input[name="+name+"]:checked").val()||textarea.val()=="") {
			alert("未選択または未入力です。");
		} else {
			// テキストエリアの入力内容を取得
			console.log($("input[name="+name+"]:checked").val(),textarea.val());
			//var tmp = [$("input[name="+name+"]:checked").val(),textarea.val()];
			//commentList.push(tmp);
			// 送信後ラジオボタンの選択とテキストエリアの入力を無効にし、送信ボタンを非表示にする
			$("input[name="+name+"]").attr('disabled', 'disabled');
			textarea.attr('disabled', 'disabled');
			$(this).css('visibility', 'hidden');
		}
	}));


	var commentObj = {cfn:cfn,opinion:{top:$('#opinion'+cfn+'-1').offset().top,left:$('#opinion'+cfn+'-1').offset().left},comment:{top:$('#comment'+cfn).offset().top,left:$('#comment'+cfn).offset().left},submit:{top:$('#cSubmit'+cfn).offset().top,left:$('#cSubmit'+cfn).offset().left}};
	jsonObj["comments"].push(commentObj);
	//var text = '{"comment'+cfn+'":{"cfn":"'+cfn+'","opinion'+cfn+'":{"top":"'+$('#opinion'+cfn).offset().top+'","left":"'+$('#opinion'+cfn).offset().left+'"},"opinion'+cfn+'-1":{"top":"'+$('#opinion'+cfn+'-1').offset().top+'","left":"'+$('#opinion'+cfn+'-1').offset().left+'"},"opinion'+cfn+'-2":{"top":"'+$('#opinion'+cfn+'-2').offset().top+'","left":"'+$('#opinion'+cfn+'-2').offset().left+'"},"comment'+cfn+'":{"top":"'+$('#comment'+cfn).offset().top+'","left":"'+$('#comment'+cfn).offset().left+'"},"cSubmit'+cfn+'":{"top":"'+$('#cSubmit'+cfn).offset().top+'","left":"'+$('#cSubmit'+cfn).offset().left+'"}}}';

	console.log(jsonObj);
	//var contact = $.parseJSON(text);
	//console.log(JSON.parse(text));

	cfn++;
	evt.preventDefault();
}