var cfn = 1;
function createComment(left,top,load) {
	var div = $('<div>')
	.attr({id:"opinion"+cfn,name:"opinion",cfn:cfn})
	.css({position:'absolute',top:top+'px',left:left+'px'})
	.draggable({
		stop:function(e,ui){
			if(presenter){
				var commentObj = {id:$(this).attr('id'),cfn:Number($(this).attr('cfn')),opinion:{top:$('#opinion'+$(this).attr('cfn')).offset().top,left:$('#opinion'+$(this).attr('cfn')).offset().left}};
				for (var i = 0; i < jsonObj["comments"].length; i++) {
					if(jsonObj["comments"][i]['cfn'] == $(this).attr('cfn')){
						jsonObj["comments"][i] = commentObj;
						break;
					}
				}
				$(this).css({border:''}).draggable('disable');
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

	var name = 'opinion'+cfn;

	$('#opinion'+cfn).append(textarea);
	$('#opinion'+cfn).append(jQuery("<br>"));
	$('#opinion'+cfn).append(jQuery("<input type='button'/>").attr({value: "送信する",id: "cSubmit"+cfn}).click(function(){
		if (!$("input[name="+name+"]:checked").val()||textarea.val()=="") {
			alert("未選択または未入力です。");
		} else {
			var submited = clientsObj.indexOf(getCookie('userID'));
			if(submited == -1){
				clientsObj.push(getCookie('userID'));
				socket.emit('submited_from_client',getCookie('userID'));
				socket.emit('comment_from_client',$("input[name="+name+"]:checked").val(),textarea.val());
				$("input[name="+name+"]").attr('disabled', 'disabled');
				textarea.attr('disabled', 'disabled');
				$(this).css('visibility', 'hidden');
			}else{
				alert("すでに送信しました。");
			}

		}
	}));
	if(!load){
		var comments = {id:$('#opinion'+cfn).attr('id'),cfn:cfn,opinion:{top:$('#opinion'+cfn).offset().top,left:$('#opinion'+cfn).offset().left}};
		jsonObj["comments"].push(comments);
	}
	cfn++;
}