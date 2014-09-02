var qToolNum = 1;
function questionTool (evt) {
	// 追加したラジオボタンの固まりごとにドラッグ機能を付与
	var div = $('<div>').attr({id:"question-"+qToolNum}).draggable({
		stop:function(e,ui){
			div.css({
				border:''
			}).draggable('disable');
		}
	}).draggable('disable').css({
		width:64*($('#spinner').spinner("value")+1)+'px'
	});

	$('#questions').append(div);
	// 選択肢の数分だけボタンを作成
	for(var i = 0; i < $('#spinner').spinner("value"); i++){
		// nameはボタンの固まりごと、idとforはボタン一つ一つに値を割り当てている
		$('#question-'+qToolNum).append(jQuery("<input type='radio' name='question"+qToolNum+"' id='question"+qToolNum+"-"+(i+1)+"' value='"+(i+1)+"'/><label for='question"+qToolNum+"-"+(i+1)+"'>"));
		$('#question'+qToolNum+"-"+(i+1)).next().html(i+1);
	}
	$('#question-'+qToolNum).append(jQuery("<br>"));
	$('#question-'+qToolNum).append(jQuery("<input type='button'/>").attr({value: "送信する"}));

	div.each(function(){
		$(this).selectable({
			selected:function(e,ui){
				$(this).css({
					border:'solid 1px red'
				}).draggable('enable');
			}
		});
	});
	qToolNum++;
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