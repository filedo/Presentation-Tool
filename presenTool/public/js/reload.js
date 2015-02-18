var jsonObj = {
	slide:[],
	questions:[],
	comments:[],
};
var clientsObj = [];
function reload(jsonData,clientsData){
	if(jsonData!=''&&clientsData==''){
		var slide = jsonData["slide"];
		var questions = jsonData["questions"];
		var comments = jsonData["comments"];

		jsonObj = jsonData;
		if(slide.length != 0){
			var src = jsonObj["slide"][jsonObj["slide"].length - 1]["src"];
			var zIndex = jsonObj["slide"][jsonObj["slide"].length - 1]["zIndex"];
			$('#slideimg').attr({
				"src":src,
				"zIndex":zIndex
			});
			var reg=/(.*)(?:\.([^.]+$))/;
			var filename=String(zIndex)+'.'+src.match(reg)[2];
			setCookie('loadedSlide',filename);
		}else{
			setCookie('loadedSlide','');
		}
		if(questions.length != 0){
			for(var i=0;i<questions.length;i++){
				var left = questions[i]["question"]["left"];
				var top = questions[i]["question"]["top"];
				var spinner = questions[i]["spinner"];
				var id = questions[i]["id"];
				var slideIndex = questions[i]["slideIndex"];
				if(slideIndex != "undefined"){
					slideIdAndFormId[slideIndex]=id;
				}
				createQuestion(spinner,left,top,true);
			}
		}
		if(comments.length != 0){
			for(var i=0;i<comments.length;i++){
				var left = comments[i]["opinion"]["left"];
				var top = comments[i]["opinion"]["top"];
				var id = comments[i]["id"];
				var slideIndex = comments[i]["slideIndex"];
				if(slideIndex != "undefined"){
					slideIdAndFormId[slideIndex]=id;
				}
				createComment(left,top,true);
			}
		}
		var key = $('#slide').find(":last").attr("zIndex");
		for (var keyString in slideIdAndFormId) {
			if(key == keyString){
				$("#"+slideIdAndFormId[keyString]).css("visibility","visible");
			}else{
				$("#"+slideIdAndFormId[keyString]).css("visibility","hidden");
			}
		}

	}
	if(clientsData!=''&&jsonData==''){
		clientsObj = clientsData;
	}
}