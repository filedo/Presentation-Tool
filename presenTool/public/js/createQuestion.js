var qfn = 1;
function createQuestion (spinner,left,top,load) {

	var div = $('<div>')
	.attr({id:"question"+qfn,name:"question",qfn:qfn})
	.css({position:'absolute',top:top+'px',left:left+'px'})
	.draggable({
		stop:function(e,ui){
			if(presenter){
				var questionObj = {id:$(this).attr('id'),qfn:Number($(this).attr('qfn')),spinner:spinner,question:{top:$('#question'+$(this).attr('qfn')).offset().top,left:$('#question'+$(this).attr('qfn')).offset().left}};
				for (var i = 0; i < jsonObj["questions"].length; i++) {
					if(jsonObj["questions"][i]['qfn'] == $(this).attr('qfn')){
						jsonObj["questions"][i] = questionObj;
						break;
					}
				}
				div.css({border:''}).draggable('disable');
				selectedId = [this.id,false];
			}
		}
	}).draggable('disable').selectable({
		selected:function(e,ui){
			if(presenter){
				$(this).css({border:'solid 1px red'}).draggable('enable');
				selectedId = [this.id,true];
			}
		}
	}).css({width:64*(spinner+1)+'px','text-align':'center'});

	$('#questions').append(div);

	for(var i = 0; i < spinner; i++){
		$('#question'+qfn).append(jQuery("<input type='radio' name='question"+qfn+"' id='question"+qfn+"-"+(i+1)+"' value='"+(i+1)+"'/><label for='question"+qfn+"-"+(i+1)+"'>"));
		$('#question'+qfn+"-"+(i+1)).next().html(i+1);
	}

	var name = 'question'+qfn;

	$('#question'+qfn).append(jQuery("<br><br>"));
	$('#question'+qfn).append(jQuery("<input type='button'/>").attr({value: "送信する",id: "qSubmit"+qfn}).click(function(){
		if (!$("input[name="+name+"]:checked").val()) {
			alert("未選択です。");
		} else {
			var submited = clientsObj.indexOf(getCookie('userID'));
			if(submited == -1){
				clientsObj.push(getCookie('userID'));
				socket.emit('submited_from_client',getCookie('userID'));
				socket.emit('question_from_client',$("input[name="+name+"]:checked").val());
				$("input[name="+name+"]").attr('disabled', 'disabled');
				$(this).css('visibility', 'hidden');
			}else{
				alert("すでに送信しました。");
			}
		}
	}));
	if(!load){
		var questionObj = {id:$('#question'+qfn).attr('id'),qfn:qfn,spinner:spinner,question:{top:$('#question'+qfn).offset().top,left:$('#question'+qfn).offset().left}};
		jsonObj["questions"].push(questionObj);
	}

	qfn++;
}