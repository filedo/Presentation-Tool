$(function(){
	$(document).ready(function() {
		$('#jMenu').jMenu({
			openClick : false,
			ulWidth :'150',
			TimeBeforeOpening : 100,
			TimeBeforeClosing : 11,
			animatedText : false,
			paddingLeft: 1,
			effects : {
				effectSpeedOpen : 150,
				effectSpeedClose : 150,
				effectTypeOpen : 'slide',
				effectTypeClose : 'slide',
				effectOpen : 'swing',
				effectClose : 'swing'
			}
		});

		socket = io.connect();

		if(getCookie('userID') == ''){
			socket.emit('userID_from_client');
		}
		socket.on('userID_from_server',function(id){
			setCookie('userID', id);
		});

		socket.emit('reload_from_client',jsonObj,clientsObj);
		socket.emit('register_from_client',getCookie('sw_javascriptauth_password'));

		socket.on('reload_from_server',function(jsonData,clientsData){
			reload(jsonData,clientsData);
		});

		socket.on('count_from_server',function(answerList,choiceNum){
			count(answerList,choiceNum);
			clientsObj = [];
		});

		socket.on('countDialog_from_server',function(){
			$('#countDialog').dialog("open");
		});

		socket.on('invalid_from_server',function(choiceId){
			$('#'+choiceId).children(":input").attr('disabled', 'disabled');
		});


		socket.on('emit_from_server',function(data){
			$('#logs').append($('<li>').text(data));
		});

		socket.on('slideload_from_server',function(length,extname){
			slideLoad(length,extname);
		});

		socket.on('nextpage_from_server',function(){
			console.timeEnd("1");
			console.time("2");
			nextPage(presenter);
			console.timeEnd("2");
		});
		socket.on('prepage_from_server',function(){
			prependPage(presenter);
		});

		socket.on('register_from_server',function(){
			var user = confirm("あなたを発表者として登録しますか？");
			if(user){
				var id = window.prompt("ユーザ名を入力してください", "");
				setCookie('sw_javascriptauth_password', id);
				socket.emit('registered_from_client',id);
				location.reload();
			}
		});
		socket.on('presenter_from_server',function(){
			$('body').find('.presenterTools').css('visibility', 'visible');
			presenter = true;
			alert(getCookie('sw_javascriptauth_password')+"さんが発表者です。");
		});

	});

$( '#spinner' ).spinner({
	max:9,
	min:1
});

$( '#questionDialog' ).dialog({
	autoOpen: false,
	width: 300,
	modal: true,
	buttons: [
	{
		text: "Ok",
		click: function() {
			createQuestion($('#spinner').spinner("value"),0,50,false);
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

$('#chatForm').submit(function(e){
	socket.emit('emit_from_client',$('#msg').val());
	//$('#msg').val('').focus();
	$("input[type=submit]").attr('disabled', 'disabled');
	//$('#msg').val('スライドが切り替わるまで待ってください。');
	e.preventDefault();
});

$('#addSlide').click(function(e){
	socket.emit('slideload_from_client');
	e.preventDefault();
});

$('#addTool').click(function(e){e.preventDefault();});

$('#edit').click(function(e){e.preventDefault();});

$('#questionForm').click(function(e){
	$('#questionDialog').dialog("open");
	e.preventDefault();
});

$('#commentForm').click(function(e){
	createComment(0,50,false);
	e.preventDefault();
});

$('#count').click(function(e){
	socket.emit('countDialog_from_client');
	e.preventDefault();
});

$( '#countDialog' ).dialog({
	autoOpen: false,
	width: 600,
	modal: true,
	buttons: [
	{
		text: "集計",
		class: "presenterTools",
		click: function() {
			var choiceNum,choiceId;
			$('#questions div').each(function(i){
				if($(this).css("visibility") == "visible"){
					choiceNum = $(this).children('label').length;
					choiceId = $(this).attr('id');
				}
			});
			socket.emit('count_from_client',choiceNum,choiceId);
		}
	}
	],
	close: function() {
		$('#countDialog').children().remove();
	}
});


$('#loaded').click(function(e){
	window.open('/loaded');
	e.preventDefault();
});

$('#save').click(function(e){
	socket.emit('save_from_client',jsonObj);
	alert("現在の状態を保存しました。");
	e.preventDefault();
});
$('#remove').click(function(e){
	var user = confirm("追加したスライドやフォーム（アンケート、感想）がすべて一旦削除されますがよろしいですか？また、アンケートのデータ、感想のデータはすべて削除されます。");
	if(user){
		removeAll();
		socket.emit('remove_from_client');
	}
	e.preventDefault();
});

$('#release').click(function(e){
	var user = confirm(getCookie('sw_javascriptauth_password')+"さんは発表者ではなくなりますがよろしいですか？");
	if(user){
		socket.emit('release_from_client');
	}
	e.preventDefault();
});

$('#help').click(function(e){
	$('#helpDialog').dialog("open");
	e.preventDefault();
});
$( '#helpDialog' ).dialog({
	resizable: false,
	autoOpen: false,
	width: 750,
	height: 400,
	modal: true,
	buttons: [
	{
		text: "Ok",
		click: function() {
			$( this ).dialog( "close" );
		}
	}
	]
});
});
