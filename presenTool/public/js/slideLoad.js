function slideLoad(length,extname){
	if($('#slideimg').size()==0){
		var img = $('<img>').attr({
			id:'slideimg',
			class:"step",
			src:'',
			zIndex:''
		});
		$('#slide').append(img);
	}
	for (var i = length; i > 0; i--) {
		var imgObj = {src:'../img/'+String(i)+extname,zIndex:i};
		jsonObj["slide"].push(imgObj);
	}
	var jsonObjLength = jsonObj["slide"].length - 1;
	$('#slideimg').attr({
		"src":jsonObj["slide"][jsonObjLength]["src"],
		"zIndex":jsonObj["slide"][jsonObjLength]["zIndex"]
	});

}
