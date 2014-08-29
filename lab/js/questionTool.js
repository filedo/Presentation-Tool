// 機能追加のメニューでアンケートボタンを押した時、ダイアログを表示する関数
function questionTool( evt ) {
	$( "#questionDialog" ).dialog( "open" );
	evt.preventDefault();
};


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