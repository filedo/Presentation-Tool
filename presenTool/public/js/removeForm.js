function removeForm(__selectedId){
	if($('#'+__selectedId[0]).attr('name')=='opinion'){
		for (var i = 0; i < jsonObj["comments"].length; i++) {
			if(jsonObj["comments"][i]['cfn'] == $('#'+__selectedId[0]).attr('cfn')){
				jsonObj["comments"].splice(i,1);
				break;
			}
		}
	}
	else if($('#'+__selectedId[0]).attr('name')=='question'){
		for (var i = 0; i < jsonObj["questions"].length; i++) {
			if(jsonObj["questions"][i]['qfn'] == $('#'+__selectedId[0]).attr('qfn')){
				jsonObj["questions"].splice(i,1);
				break;
			}
		}
	}
	$('#'+__selectedId[0]).remove();
	selectedId = ["id",false];
}