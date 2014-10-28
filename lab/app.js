var app = require('http').createServer(handler),
io = require('socket.io').listen(app),
path = require('path'),
fs = require('fs');
app.listen(1337);
function handler(req, res) {
    // ファイルパスから拡張子を取得
    var extname = path.extname(req.url);
    switch(extname) {
        case '':
        // 現在のディレクトリにあるindex.htmlを読み込む
        fs.readFile(__dirname +'/index.html',function(err,data){
            // errが出れば500番のインターナルサーバエラーを返して終了
            // うまくいけば200番を返し、index.htmlの中身を表示させる
            if(err){
                res.writeHead(500);
                return res.end('Error');
            }
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        });
        break;
        case '.css':
        fs.readFile(__dirname +'/node_modules'+req.url, 'UTF-8',
                    function (err, data) {
                        res.writeHead(200, {'Content-Type': 'text/css'});
                        res.write(data);
                        res.end();
                    }
                    );
        break;
        case '.js':
        fs.readFile(__dirname +'/node_modules'+req.url, 'UTF-8',
                    function (err, data) {
                        res.writeHead(200, {'Content-Type': 'text/javascript'});
                        res.write(data);
                        res.end();
                    }
                    );
        break;
        case '.png':
        fs.readFile(__dirname +'/node_modules'+req.url,
                    function (err, data) {
                        res.writeHead(200, {'Content-Type': 'image/png'});
                        res.write(data);
                        res.end();
                    }
                    );
        break;
        case '.jpg':
        fs.readFile(__dirname +'/node_modules'+req.url,
                    function (err, data) {
                        res.writeHead(200, {'Content-Type': 'image/jpg'});
                        res.write(data);
                        res.end();
                    }
                    );
        break;
        default:
        break;
    }
}

io.sockets.on('connection',function(socket) {
	socket.on('emit_from_client',function(data){
		// console.log(data);
		// 接続しているソケットのみ
		// socket.emit('emit_from_server','hello from server:'+data);
		// 接続しているソケット以外全部
		// socket.broadcast.emit('emit_from_server','hello from server:'+data);
		// 接続しているソケット全部
		io.sockets.emit('emit_from_server','['+ socket.id +']：'+data);
        //io.sockets.emit('emit_from_server',data);
		// 以下のset、getは現在のsocket.ioのバージョンでは対応しておらず使えない
		// socket.set('client_name',data.name);
		// socket.get('client_name',function(err,name){
		//	io.sockets.emit('emit_from_server','['+ name +']：'+data.msg);
		//});

    });
    // jsonObjの情報を現在のディレクトリにjson.txtとして保存する
    socket.on('save_from_client',function(data){
        fs.writeFile('json.txt', JSON.stringify(data));
    });
    // ページの再読み込み時にjson.txtが存在すればそのデータを読み込み、存在しなければ作成する
     socket.on('reload_from_client',function(jsonObj){
         fs.readFile('json.txt', 'utf8', function (err, data) {
            if(err){
                fs.writeFile('json.txt',JSON.stringify(jsonObj));
            }else{
                socket.emit('reload_from_server',JSON.parse(data));
            }
        });
    });
    // question.txtファイルを読み込み、カンマで区切ったリストに変換し、そのリストをすべてのクライアントに送る
    // answerList:['1','2','4','1'...]
    socket.on('count_from_client',function(){
        fs.readFile('question.txt','utf8',function(err,data){
            if (err){
                console.log(err);
            }else{
                var answerList = data.split(',');
                // question.txtの最後の','を削除
                answerList.pop();
                io.sockets.emit('count_from_server',answerList);
            }
        });
    });
    socket.on('countDialog_from_client',function(){
        io.sockets.emit('countDialog_from_server');
    });
    // コメントフォームの送信内容を現在のディレクトリにcomment.txtとして保存する
    socket.on('comment_from_client',function(data1,data2){
        var commentData = data1 + ": " + data2 + "\n";
        fs.appendFile('comment.txt',commentData, function (err) {
            if (err) throw err;
        });
    });
    // アンケートフォームの送信内容を現在のディレクトリにcomment.txtとして保存する
    socket.on('question_from_client',function(data){
        var questionData = data + ",";
        fs.appendFile('question.txt',questionData, function (err) {
            if (err) throw err;
        });
    });
    socket.on('rmQuestionFile_from_client',function(){
        fs.unlink(__dirname+'/question.txt',function(err){
            if (err) throw err;
        });
    });
    socket.on('register_from_client',function(){
        fs.writeFile('cookie.txt', socket.id);
        socket.emit('register_from_server',socket.id);
    });
    socket.on('cookie_client',function(id){
        fs.readFile('cookie.txt', 'utf8', function (err, data) {
            if(id==data){
                socket.emit('presenter_from_server');
            }
        });
    });
    // 全クライアントに→キーが押されたことを伝える
    socket.on('nextpage_from_client',function(){
       io.sockets.emit('nextpage_from_server');
    });
    // 全クライアントに←キーが押されたことを伝える
    socket.on('prepage_from_client',function(){
       io.sockets.emit('prepage_from_server');
    });

    // 全クライアントにスライドに使う画像データのファイル数を伝える
    socket.on('slideload_from_client',function(){
        var dir = __dirname + '/node_modules/img/';
        fs.readdir(dir, function(err, files){
            if(err) throw err;
           io.sockets.emit('slideload_from_server',files.length);
        });
    });

});