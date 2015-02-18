function prependPage(presenter){
	var first = jsonObj["slide"].shift();
	jsonObj["slide"].push(first);
	if(presenter){
		socket.emit('save_from_client',jsonObj);
		socket.emit('rmClientList_from_client');
	}
	var src=jsonObj["slide"][jsonObj["slide"].length - 1]["src"];
	var zIndex=jsonObj["slide"][jsonObj["slide"].length - 1]["zIndex"];

	$('#slideimg').attr({
		"src":src,
		"zIndex":zIndex
	});

	var reg=/(.*)(?:\.([^.]+$))/;
	var filename=String(zIndex)+'.'+src.match(reg)[2];
	setCookie('loadedSlide',filename);

	var key = $('#slide').find(":last").attr("zIndex");
	for (var keyString in slideIdAndFormId) {
		if(key == keyString){
			$("#"+slideIdAndFormId[keyString]).css("visibility","visible");
		}else{
			$("#"+slideIdAndFormId[keyString]).css("visibility","hidden");
		}
	}
	$("input[type=submit]").removeAttr("disabled");
}