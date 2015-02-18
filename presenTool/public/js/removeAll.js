function removeAll(){
	qfn = 1;
	cfn = 1;
	$('#slide').children().remove();
	$('#questions').children().remove();
	$('#comments').children().remove();

	jsonObj = {
		slide:[],
		questions:[],
		comments:[],
	};

}