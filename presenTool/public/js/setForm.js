var slideIdAndFormId = {};
function setForm(__selectedId){
	var key = $('#slide').find(":last").attr("zIndex");
	var value = $('#'+__selectedId[0]).attr("id");
	if($('#'+__selectedId[0]).attr('name')=='opinion'){
		for (var i = 0; i < jsonObj["comments"].length; i++) {
			if(jsonObj["comments"][i]['id'] == value){
				jsonObj["comments"][i].slideIndex = Number(key);
				break;
			}
		}
	}
	else if($('#'+__selectedId[0]).attr('name')=='question'){
		for (var i = 0; i < jsonObj["questions"].length; i++) {
			if(jsonObj["questions"][i]['id'] == value){
				jsonObj["questions"][i].slideIndex = Number(key);
				break;
			}
		}
	}
	slideIdAndFormId[key] = value;
	$('#'+__selectedId[0]).css({border:''}).draggable().draggable('disable');

	selectedId = ["id",false];
}