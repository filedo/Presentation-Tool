var qFormNum = 1;
// アンケートの選択内容を格納するリスト
var questionList = [];
function questionForm (evt) {

	// 1つのアンケートフォームの固まりとしてdivタグを作成する
	// 初期状態としてドラッグ不可能にしている
	// ドラッグ終了時には灰色の枠線を消し、再びドラッグ不可能な状態に戻す
	// 選択されると赤色の枠線が表示されドラッグ可能になる
	var div = $('<div>').attr({id:"question-"+qFormNum}).draggable({
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
		$('#question-'+qFormNum).append(jQuery("<input type='radio' name='question"+qFormNum+"' id='question"+qFormNum+"-"+(i+1)+"' value='"+(i+1)+"'/><label for='question"+qFormNum+"-"+(i+1)+"'>"));
		$('#question'+qFormNum+"-"+(i+1)).next().html(i+1);
	}

	// どのボタンが選択されたかチェックするためにボタンのnameを記録
	var name = 'question'+qFormNum;

	$('#question-'+qFormNum).append(jQuery("<br><br>"));
	$('#question-'+qFormNum).append(jQuery("<input type='button'/>").attr({value: "送信する"}).click(function(){
		if (!$("input[name="+name+"]:checked").val()) {
			alert("未選択です。");
		} else {
			// テキストエリアの入力内容を取得
			console.log($("input[name="+name+"]:checked").val());
			questionList.push($("input[name="+name+"]:checked").val());
		}
	}));

	qFormNum++;
}

/*
var count=1;
$( "#questionDialog" ).dialog({
	autoOpen: false,
	width: 200,
	modal: true,
	buttons: [
	{
		text: "Ok",
		click: function() {
			//追加したラジオボタンの固まりごとにドラッグ機能を付与
			var div = $('<div>').attr({id:"question-"+count}).draggable();
			$('#question').append(div);
			//選択肢の数分だけボタンを作成
			for(var i = 0; i < $('#spinner').spinner("value"); i++){
				$('#question-'+count).append(jQuery("<input type='radio'/>").attr({
					id:"radio"+(i+1),
					name:"radio",
					value:i+1
				}).html("あ"));
			//	$("input").text("あ");
				//$('#radio1').append(label);
					//var input = document.createElement('input');
			//	$('#dragarea').html=['<input type="radio" value="',i+1,'"/>'].join('');
				//input.innerHTML=['<input type="radio" value="',i+1,'"/>'].join('');
				//input.type="radio";
				//input.id="radio"+(i+1);
				//input.name="radio";
				//input.value=i+1;
				//input.innerHTML = i+1;
				/*jQuery('<input type="radio"/>').attr({

					id:"radio"+(i+1),
					name:"radio",
					value:i+1
				}).html("あ");
*/
/*$('#question-'+count).append(jQuery("<input type='radio'/>").attr({
					id:"radio"+(i+1),
					name:"radio",
					value:i+1
				}).html("あ"));*/
			/*	var input = $('<iuput type="radio"/>').attr({

					id:"radio"+(i+1),
					name:"radio",
					value:i+1
				}).html("あ");*/

				//input.html("あ");

				/*var label = $('<label/>').attr({
					for:i+1
				});
label.html("あ");*/
			//}$('#radio1').prepend(label);
			/*count++;
			$( this ).dialog( "close" );
		}
	},
	{
		text: "Cancel",
		click: function() {
			$( this ).dialog( "close" );
		}

	}
	]
});
*/