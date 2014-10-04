// questionFormNumber(qfn)
var qfn = 1;
// アンケートの選択内容を格納するリスト
var questionList = [];
function questionForm (evt) {

	// 1つのアンケートフォームの固まりとしてdivタグを作成する
	// 初期状態としてドラッグ不可能にしている
	// ドラッグ終了時には灰色の枠線を消し、再びドラッグ不可能な状態に戻す
	// 選択されると赤色の枠線が表示されドラッグ可能になる
	var div = $('<div>').attr({id:"question"+qfn,name:"question",qfn:qfn}).draggable({
		stop:function(e,ui){
			div.css({
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
	}).css({width:64*($('#spinner').spinner("value")+1)+'px','text-align':'center'});

	$('#questions').append(div);

	// 選択肢の数分だけボタンを作成
	for(var i = 0; i < $('#spinner').spinner("value"); i++){
		// nameはボタンの固まりごと、idとforはボタン一つ一つに値を割り当てている
		$('#question'+qfn).append(jQuery("<input type='radio' name='question"+qfn+"' id='question"+qfn+"-"+(i+1)+"' value='"+(i+1)+"'/><label for='question"+qfn+"-"+(i+1)+"'>"));
		$('#question'+qfn+"-"+(i+1)).next().html(i+1);
	}

	// どのボタンが選択されたかチェックするためにボタンのnameを記録
	var name = 'question'+qfn;

	$('#question'+qfn).append(jQuery("<br><br>"));
	$('#question'+qfn).append(jQuery("<input type='button'/>").attr({value: "送信する",id: "qSubmit"+qfn}).click(function(){
		if (!$("input[name="+name+"]:checked").val()) {
			alert("未選択です。");
		} else {
			// テキストエリアの入力内容を取得
			console.log($("input[name="+name+"]:checked").val());
			questionList.push($("input[name="+name+"]:checked").val());
			// 送信後ラジオボタンの選択を無効にし、送信ボタンを非表示にする
			$("input[name="+name+"]").attr('disabled', 'disabled');
			$(this).css('visibility', 'hidden');
		}
	}));

	var questionObj = {qfn:qfn,spinner:$('#spinner').spinner("value"),question:{top:$('#question'+qfn+'-1').offset().top,left:$('#question'+qfn+'-1').offset().left},submit:{top:$('#qSubmit'+qfn).offset().top,left:$('#qSubmit'+qfn).offset().left}};
	jsonObj["questions"].push(questionObj);

	//var text = '{"question'+qfn+'":{"qfn":"'+qfn+'","spinner":"'+$('#spinner').spinner("value")+'",question'+qfn+'":{"top":"'+$('#question'+qfn).offset().top+'","left":"'+$('#question'+qfn).offset().left+'"},"question'+qfn+'-1":{"top":"'+$('#question'+qfn+'-1').offset().top+'","left":"'+$('#question'+qfn+'-1').offset().left+'"},"qSubmit'+qfn+'":{"top":"'+$('#qSubmit'+qfn).offset().top+'","left":"'+$('#qSubmit'+qfn).offset().left+'"}}}';
	console.log(jsonObj);

	qfn++;
}