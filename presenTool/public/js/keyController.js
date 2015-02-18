var selectedId = ["id",false];
$(function(){
	$(window).keyup(function(e){
		switch(e.which){

			case 39:
			if(presenter){
				if($('#slideimg').attr("src") != ""){
					console.time("1");
					nextPage(presenter);
					socket.emit('nextpage_from_client');
				}
			}
			break;

			case 37:
			if(presenter){
				if($('#slideimg').attr("src") != ""){
					prependPage(presenter);
					socket.emit('prepage_from_client');
				}
			}
			break;

			case 68:
			if(presenter){
				if(selectedId[1]==true){
					removeForm(selectedId);
				}
			}
			break;

			case 13:
			if(presenter){
				if(selectedId[1]==true && $('#slideimg').attr("src") != ""){
					setForm(selectedId);
					alert("選択中のフォームを現在のスライドにセットしました。");
				}
			}
			break;
		}
	});
});
